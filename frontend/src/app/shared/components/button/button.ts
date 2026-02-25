import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link' | 'dashed';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.w-full]': 'fullWidth()'
  }
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  icon = input<string>();
  fullWidth = input(false);

  buttonClass = () => {
    const base = 'inline-flex items-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants: Record<ButtonVariant, string> = {
      primary: 'justify-center bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'justify-center bg-card border border-border text-foreground hover:bg-muted',
      danger: 'justify-center bg-destructive text-destructive-foreground hover:bg-destructive/90',
      ghost: 'justify-center hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      dashed: 'justify-center bg-card border-2 border-dashed border-border text-foreground hover:bg-muted'
    };

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      icon: 'h-10 w-10'
    };
    
    // Link variant doesn't use standard padding sizes.
    const sizeClass = this.variant() === 'link' ? 'p-0 h-auto' : sizes[this.size()];
    
    return [base, variants[this.variant()], sizeClass].join(' ');
  }

  iconClass = () => {
    const sizes: Record<ButtonSize, string> = {
      sm: 'text-base',
      md: 'text-base',
      lg: 'text-lg',
      icon: 'text-xl'
    };
    // Add margin if there is content (text) next to the icon.
    const margin = this.size() !== 'icon' ? 'me-2' : '';
    return [sizes[this.size()], margin].join(' ');
  }
}
