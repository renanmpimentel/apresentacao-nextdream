import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import Presentation from './Presentation';

vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('Presentation immersive navigation', () => {
  test('updates slide counter from overlay controls and keyboard', async () => {
    const user = userEvent.setup();
    render(<Presentation />);

    expect(screen.getByText('1 / 10')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Próximo slide' }));
    expect(screen.getByText('2 / 10')).toBeTruthy();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('3 / 10')).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Slide 1' }));
    expect(screen.getByText('1 / 10')).toBeTruthy();
  });

  test('advances on horizontal swipe', () => {
    render(<Presentation />);
    const [stage] = screen.getAllByTestId('presentation-stage');

    fireEvent.touchStart(stage, {
      touches: [{ clientX: 220, clientY: 120 }],
    });
    fireEvent.touchEnd(stage, {
      changedTouches: [{ clientX: 80, clientY: 118 }],
    });

    expect(screen.getByText('2 / 10')).toBeTruthy();
  });
});
