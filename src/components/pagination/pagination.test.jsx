import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import Pagination from './index';

describe('React component: Pagination', () => {
  it('Должен проставлятся атрибут [disabled] для кнопки "назад", если выбрана первая страница', async () => {
    render(
      <Pagination
        disable={{
          left: true,
          right: false,
        }}
        onPrevPageClick={jest.fn()}
        onNextPageClick={jest.fn()}
      />
    );

    const prevButton = screen.getByTestId('pagination-prev-button');
    expect(prevButton).toHaveAttribute('disabled');
  });

  it('Должен проставлятся атрибут [disabled] для кнопки "вперёд", если выбрана последняя страница', async () => {
    render(
      <Pagination
        disable={{
          left: false,
          right: true,
        }}
        onPrevPageClick={jest.fn()}
        onNextPageClick={jest.fn()}
      />
    );

    const nextButton = screen.getByTestId('pagination-next-button');
    expect(nextButton).toHaveAttribute('disabled');
  });

  it('Не должна отображаться навигация "<текущая страница>/<все страницы>" если не предоставлен соответствующий пропс "nav"', async () => {
    render(
      <Pagination
        disable={{
          left: false,
          right: false,
        }}
        onPrevPageClick={jest.fn()}
        onNextPageClick={jest.fn()}
      />
    );

    expect(() => screen.getByTestId('pagination-navigation')).toThrow();
  });

  it('Должен вызываться обработчик "onPrevPageClick" при клике на кнопку "назад"', async () => {
    const onPrevPageClick = jest.fn();

    render(
      <Pagination
        disable={{
          left: false,
          right: false,
        }}
        onPrevPageClick={onPrevPageClick}
        onNextPageClick={jest.fn()}
      />
    );

    const prevButton = screen.getByTestId('pagination-prev-button');
    fireEvent.click(prevButton);

    expect(onPrevPageClick).toHaveBeenCalledTimes(1);
  });

  it('Должен вызываться обработчик "onNextPageClick" при клике на кнопку "вперёд"', async () => {
    const onNextPageClick = jest.fn();

    render(
      <Pagination
        disable={{
          left: false,
          right: false,
        }}
        onPrevPageClick={jest.fn()}
        onNextPageClick={onNextPageClick}
      />
    );

    const nextButton = screen.getByTestId('pagination-next-button');
    fireEvent.click(nextButton);

    expect(onNextPageClick).toHaveBeenCalledTimes(1);
  });
});
