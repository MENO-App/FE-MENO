import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
import { apiFetch } from "@/api/http";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Loader2, ArrowLeft, X, Pencil } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Allergy = {
  allergyId: string;
  name: string;
};

type UserAllergy = {
  allergyId: string;
  name: string;
  notes: string;
};

export default function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();

  const userId: string = auth.userId ?? "";
  const isAdmin = auth.roles.includes("ADMIN");

  // Email editing
  const [displayEmail, setDisplayEmail] = useState(auth.email ?? "");
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(auth.email ?? "");
  const [savingEmail, setSavingEmail] = useState(false);

  // Password change
  const [editingPassword, setEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  // Allergies
  const [allAllergies, setAllAllergies] = useState<Allergy[]>([]);
  const [selectedAllergyIds, setSelectedAllergyIds] = useState<string[]>([]);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [customAllergyNote, setCustomAllergyNote] = useState("");
  const [savedCustomNote, setSavedCustomNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [pendingCustomAllergyId, setPendingCustomAllergyId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user allergies and all available allergies
  useEffect(() => {
    async function load() {
      try {
        const [userAllergiesRes, allAllergiesRes] = await Promise.all([
          apiFetch(`/users/${userId}/allergies`),
          apiFetch("/allergies"),
        ]);

        if (userAllergiesRes.ok) {
          const data: UserAllergy[] = await userAllergiesRes.json();
          setSelectedAllergyIds(data.map((a) => a.allergyId));

          // Load existing note for "Annan" if it exists
          const annanEntry = data.find((a) => a.name.toLowerCase() === "annan");
          if (annanEntry && annanEntry.notes) {
            setCustomAllergyNote(annanEntry.notes);
            setSavedCustomNote(annanEntry.notes);
          }
        }

        if (allAllergiesRes.ok) {
          const data: Allergy[] = await allAllergiesRes.json();
          setAllAllergies(data);
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Could not load allergies. Check your connection.");
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) {
      load();
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  const isAnnan = (allergyId: string) => {
    const allergy = allAllergies.find((a) => a.allergyId === allergyId);
    return allergy?.name.toLowerCase() === "annan";
  };

  const toggleAllergy = async (allergyId: string) => {
    if (togglingId) return;

    const isSelected = selectedAllergyIds.includes(allergyId);

    // If selecting "Annan" and it's not already selected, show input first
    if (!isSelected && isAnnan(allergyId)) {
      setPendingCustomAllergyId(allergyId);
      setShowCustomInput(true);
      setCustomAllergyNote("");
      return;
    }

    setTogglingId(allergyId);
    setError("");

    try {
      if (isSelected) {
        const res = await apiFetch(`/users/${userId}/allergies/${allergyId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove");
        setSelectedAllergyIds((prev) => prev.filter((id) => id !== allergyId));
        if (isAnnan(allergyId)) {
          setShowCustomInput(false);
          setCustomAllergyNote("");
          setPendingCustomAllergyId(null);
        }
        toast.success("Allergy removed");
      } else {
        const res = await apiFetch(`/users/${userId}/allergies`, {
          method: "POST",
          body: JSON.stringify({ allergyId, notes: "" }),
        });
        if (!res.ok) throw new Error("Failed to add");
        setSelectedAllergyIds((prev) => [...prev, allergyId]);
        toast.success("Allergy added");
      }
    } catch {
      setError("Failed to update. Please try again.");
      toast.error("Failed to update allergy");
    } finally {
      setTogglingId(null);
    }
  };

  const handleSubmitCustomAllergy = async () => {
    if (!pendingCustomAllergyId || !customAllergyNote.trim()) {
      toast.error("Beskriv din allergi");
      return;
    }

    setTogglingId(pendingCustomAllergyId);
    setError("");

    try {
      const res = await apiFetch(`/users/${userId}/allergies`, {
        method: "POST",
        body: JSON.stringify({ allergyId: pendingCustomAllergyId, notes: customAllergyNote.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add");
      setSelectedAllergyIds((prev) => [...prev, pendingCustomAllergyId]);
      setSavedCustomNote(customAllergyNote.trim());
      setShowCustomInput(false);
      setPendingCustomAllergyId(null);
      setCustomAllergyNote(""); // Clear input after save
      toast.success("Allergy added");
    } catch {
      setError("Failed to update. Please try again.");
      toast.error("Failed to update allergy");
    } finally {
      setTogglingId(null);
    }
  };

  const handleUpdateCustomNote = async () => {
    const annanAllergy = allAllergies.find((a) => a.name.toLowerCase() === "annan");
    if (!annanAllergy || !customAllergyNote.trim()) {
      toast.error("Beskriv din allergi");
      return;
    }

    setSavingNote(true);
    setError("");

    try {
      const res = await apiFetch(`/users/${userId}/allergies`, {
        method: "POST",
        body: JSON.stringify({ allergyId: annanAllergy.allergyId, notes: customAllergyNote.trim() }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setSavedCustomNote(customAllergyNote.trim());
      toast.success("Allergi uppdaterad");
    } catch {
      setError("Failed to update. Please try again.");
      toast.error("Kunde inte uppdatera");
    } finally {
      setSavingNote(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!newEmail.trim()) {
      toast.error("Email cannot be empty");
      return;
    }
    setSavingEmail(true);
    try {
      const res = await apiFetch("/users/me/email", {
        method: "PUT",
        body: JSON.stringify({ email: newEmail.trim() }),
      });
      if (!res.ok) throw new Error("Failed to update email");
      setDisplayEmail(newEmail.trim());
      toast.success("Email updated");
      setEditingEmail(false);
    } catch {
      toast.error("Failed to update email");
    } finally {
      setSavingEmail(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword) {
      toast.error("Enter your current password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSavingPassword(true);
    try {
      const res = await apiFetch("/users/me/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      if (!res.ok) throw new Error("Failed to change password");
      toast.success("Password changed");
      setEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Failed to change password. Check your current password.");
    } finally {
      setSavingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Account info */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email */}
              <div>
                <Label className="text-muted-foreground">Email</Label>
                {editingEmail ? (
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      disabled={savingEmail}
                    />
                    <Button onClick={handleSaveEmail} disabled={savingEmail} size="sm">
                      {savingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingEmail(false);
                        setNewEmail(displayEmail);
                      }}
                      disabled={savingEmail}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-medium">{displayEmail}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setEditingEmail(true)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <Label className="text-muted-foreground">Password</Label>
                {editingPassword ? (
                  <div className="space-y-2 mt-1">
                    <Input
                      type="password"
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      disabled={savingPassword}
                    />
                    <Input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={savingPassword}
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={savingPassword}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleChangePassword} disabled={savingPassword} size="sm">
                        {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : "Change password"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingPassword(false);
                          setCurrentPassword("");
                          setNewPassword("");
                          setConfirmPassword("");
                        }}
                        disabled={savingPassword}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-medium">********</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setEditingPassword(true)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Allergies - hidden for admins */}
          {!isAdmin && <Card>
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
              <CardDescription>
                Tap to add or remove allergies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {allAllergies.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No allergies available in the system yet.
                </p>
              ) : (
                <>
                  {/* Selected allergies */}
                  {selectedAllergyIds.length > 0 && (
                    <div>
                      <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                        Your allergies
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {allAllergies
                          .filter((a) => selectedAllergyIds.includes(a.allergyId))
                          .map((allergy) => {
                            // Determine label for "Annan" with notes
                            let label = allergy.name;
                            if (allergy.name.toLowerCase() === "annan" && customAllergyNote.trim()) {
                              label = customAllergyNote.trim();
                            }
                            return (
                              <button
                                key={allergy.allergyId}
                                onClick={() => toggleAllergy(allergy.allergyId)}
                                disabled={togglingId === allergy.allergyId}
                                className={cn(
                                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                                  "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20",
                                  togglingId === allergy.allergyId && "opacity-50"
                                )}
                              >
                                {togglingId === allergy.allergyId ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <X className="h-3 w-3" />
                                )}
                                {label}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* Available allergies to add */}
                  {(() => {
                    const available = allAllergies.filter(
                      (a) => !selectedAllergyIds.includes(a.allergyId)
                    );
                    if (available.length === 0) return null;
                    return (
                      <div>
                        <Label className="text-muted-foreground text-xs uppercase tracking-wide">
                          {selectedAllergyIds.length > 0 ? "Add more" : "Select allergies"}
                        </Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {available.map((allergy) => (
                            <button
                              key={allergy.allergyId}
                              onClick={() => toggleAllergy(allergy.allergyId)}
                              disabled={togglingId === allergy.allergyId}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                                "bg-muted text-muted-foreground border border-border hover:bg-accent hover:text-accent-foreground",
                                togglingId === allergy.allergyId && "opacity-50"
                              )}
                            >
                              {togglingId === allergy.allergyId ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "+"
                              )}
                              {allergy.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Custom allergy input for "Annan" - shown when adding */}
                  {showCustomInput && (
                    <div className="mt-3 space-y-2">
                      <Label>Beskriv din allergi</Label>
                      <Input
                        placeholder="T.ex. selleri, senap..."
                        value={customAllergyNote}
                        onChange={(e) => setCustomAllergyNote(e.target.value)}
                        disabled={togglingId !== null}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSubmitCustomAllergy}
                          disabled={togglingId !== null}
                        >
                          {togglingId ? <Loader2 className="h-4 w-4 animate-spin" /> : "Spara"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowCustomInput(false);
                            setPendingCustomAllergyId(null);
                            setCustomAllergyNote("");
                          }}
                          disabled={togglingId !== null}
                        >
                          Avbryt
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Custom allergy note - shown when "Annan" is already selected */}
                  {!showCustomInput && allAllergies.some(
                    (a) => a.name.toLowerCase() === "annan" && selectedAllergyIds.includes(a.allergyId)
                  ) && (
                    <div className="mt-3 space-y-2">
                      <Label>Din allergibeskrivning</Label>
                      <Input
                        placeholder="T.ex. selleri, senap..."
                        value={customAllergyNote}
                        onChange={(e) => setCustomAllergyNote(e.target.value)}
                        disabled={savingNote}
                      />
                      {customAllergyNote.trim() !== savedCustomNote && (
                        <Button
                          size="sm"
                          onClick={handleUpdateCustomNote}
                          disabled={savingNote}
                        >
                          {savingNote ? <Loader2 className="h-4 w-4 animate-spin" /> : "Spara ändring"}
                        </Button>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>}
        </div>
      </div>
    </div>
  );
}
