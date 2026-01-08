import { ALLERGEN_CODES } from '@/types/canteen';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AllergenBadgeProps {
  code: string;
  showName?: boolean;
}

export const AllergenBadge = ({ code, showName = false }: AllergenBadgeProps) => {
  const allergen = ALLERGEN_CODES[code];
  
  if (!allergen) return null;

  const badge = (
    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium allergen-badge">
      <span>{allergen.emoji}</span>
      {showName && <span>{allergen.name}</span>}
    </span>
  );

  if (showName) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent>
        <p>{allergen.name}</p>
      </TooltipContent>
    </Tooltip>
  );
};
