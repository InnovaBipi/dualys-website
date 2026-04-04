import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { locales, localeNames } from '@/lib/i18n/config';

// Mock the i18n navigation
const mockReplace = vi.fn();
vi.mock('@/lib/i18n/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: vi.fn(),
  }),
  usePathname: () => '/about',
}));

// Mock next-intl useLocale
let currentLocale = 'en';
vi.mock('next-intl', () => ({
  useLocale: () => currentLocale,
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockReplace.mockClear();
    currentLocale = 'en';
  });

  describe('Rendering', () => {
    it('renders the language switcher button', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('displays current locale', () => {
      render(<LanguageSwitcher />);

      // The text is 'en' in the DOM, CSS transforms it to uppercase visually
      const localeSpan = screen.getByText('en');
      expect(localeSpan).toBeInTheDocument();
      expect(localeSpan).toHaveClass('uppercase');
    });

    it('dropdown is closed by default', () => {
      render(<LanguageSwitcher />);

      // Menu items should not be visible initially
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Dropdown functionality', () => {
    it('opens dropdown when button is clicked', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Menu should now be visible
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('renders all 4 language options when open', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Check all language names are displayed
      locales.forEach((locale) => {
        expect(screen.getByText(localeNames[locale])).toBeInTheDocument();
      });
    });

    it('displays correct number of language options', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(4);
    });

    it('closes dropdown when clicking a language', () => {
      render(<LanguageSwitcher />);

      // Open dropdown
      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Click a language
      const frenchOption = screen.getByText('Français');
      fireEvent.click(frenchOption);

      // Dropdown should be closed
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Language selection', () => {
    it('calls router.replace when selecting a new language', () => {
      render(<LanguageSwitcher />);

      // Open dropdown
      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Click French
      const frenchOption = screen.getByText('Français');
      fireEvent.click(frenchOption);

      expect(mockReplace).toHaveBeenCalledWith('/about', { locale: 'fr' });
    });

    it('calls router.replace with correct locale for each language', () => {
      const testCases = [
        { name: 'Español', locale: 'es' },
        { name: 'Català', locale: 'ca' },
      ];

      testCases.forEach(({ name, locale }) => {
        mockReplace.mockClear();
        const { unmount } = render(<LanguageSwitcher />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const option = screen.getByText(name);
        fireEvent.click(option);

        expect(mockReplace).toHaveBeenCalledWith('/about', { locale });

        unmount();
      });
    });
  });

  describe('Accessibility', () => {
    it('button has correct aria attributes when closed', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
    });

    it('button has correct aria-expanded when open', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('menu items have correct role', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(4);
    });

    it('menu has correct aria-orientation', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const menu = screen.getByRole('menu');
      expect(menu).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Visual state', () => {
    it('displays all supported languages', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('Français')).toBeInTheDocument();
      expect(screen.getByText('Español')).toBeInTheDocument();
      expect(screen.getByText('Català')).toBeInTheDocument();
    });
  });

  describe('Inline variant', () => {
    it('renders all 4 language buttons directly without dropdown', () => {
      render(<LanguageSwitcher variant="inline" />);

      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(4);
      // No menu role should exist
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('has radiogroup container', () => {
      render(<LanguageSwitcher variant="inline" />);

      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('marks current locale as checked', () => {
      currentLocale = 'es';
      render(<LanguageSwitcher variant="inline" />);

      const esButton = screen.getByRole('radio', { name: 'Español' });
      expect(esButton).toHaveAttribute('aria-checked', 'true');

      const enButton = screen.getByRole('radio', { name: 'English' });
      expect(enButton).toHaveAttribute('aria-checked', 'false');
    });

    it('calls router.replace when clicking a language pill', () => {
      render(<LanguageSwitcher variant="inline" />);

      const frButton = screen.getByRole('radio', { name: 'Français' });
      fireEvent.click(frButton);

      expect(mockReplace).toHaveBeenCalledWith('/about', { locale: 'fr' });
    });

    it('calls onLanguageChange callback after selection', () => {
      const onChangeMock = vi.fn();
      render(<LanguageSwitcher variant="inline" onLanguageChange={onChangeMock} />);

      const frButton = screen.getByRole('radio', { name: 'Français' });
      fireEvent.click(frButton);

      expect(onChangeMock).toHaveBeenCalledOnce();
    });

    it('each pill has minimum touch target size classes', () => {
      render(<LanguageSwitcher variant="inline" />);

      const radios = screen.getAllByRole('radio');
      radios.forEach(radio => {
        expect(radio.className).toContain('min-h-[44px]');
        expect(radio.className).toContain('min-w-[44px]');
      });
    });
  });
});
