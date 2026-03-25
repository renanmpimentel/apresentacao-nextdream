import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import App from './App';

vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

describe('App export mode', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
    cleanup();
  });

  test('renders the static export deck when export=pdf is present', () => {
    window.history.replaceState({}, '', '/?export=pdf');

    render(<App />);

    expect(screen.getByTestId('presentation-export')).toBeTruthy();
    expect(screen.getByTestId('presentation-export-slide-10')).toBeTruthy();
  });

  test('renders the interactive presentation by default', () => {
    render(<App />);

    expect(screen.getByTestId('presentation-stage')).toBeTruthy();
  });
});
