import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import Select from './index';
import options from './options.json';

describe('React component: Select', () => {
  /** Фиксируем корректное проставление значений data-selected атрибута */
  it('Должен проставляться атрибут [data-selected="true"] для плейсхолдера, если было выбранно значение', async () => {
    render(
      <Select
        options={options}
        onChange={jest.fn()}
        selected={options[0]}
        placeholder="placeholder"
      />
    );

    const placeholder = screen.queryByText(options[0].title);
    expect(placeholder).toHaveAttribute('data-selected', 'true');
  });
  it('Должен проставляться атрибут [data-selected="false"] для плейсхолдера, если НЕ было выбранно значение селекта', async () => {
    render(
      <Select
        options={options}
        onChange={jest.fn()}
        selected={null}
        placeholder="placeholder"
      />
    );

    const placeholder = screen.queryByText('placeholder');

    expect(placeholder).toHaveAttribute('data-selected', 'false');
  });

  /** Фиксируем корректное проставление значений data-mode атрибута */
  it('Должен проставляться атрибут [data-mode="rows"] для selectWrapper, если передано значение mode=rows', async () => {
    render(
      <Select
        options={options}
        onChange={jest.fn()}
        selected={null}
        placeholder="placeholder"
        mode="rows"
      />
    );

    const selectWrapper = screen.getByTestId('selectWrapper');
    expect(selectWrapper).toHaveAttribute('data-mode', 'rows');
  });
  it('Должен проставляться атрибут [data-mode="cells"] для selectWrapper, если передано значение mode=cells', async () => {
    render(
      <Select
        options={options}
        onChange={jest.fn()}
        selected={null}
        placeholder="placeholder"
        mode="cells"
      />
    );

    const selectWrapper = screen.getByTestId('selectWrapper');
    expect(selectWrapper).toHaveAttribute('data-mode', 'cells');
  });
  it('Должен проставляться атрибут [data-mode="rows"] для selectWrapper, если не свойство mode не указано', async () => {
    render(
      <Select
        options={options}
        onChange={jest.fn()}
        selected={null}
        placeholder="placeholder"
      />
    );

    const selectWrapper = screen.getByTestId('selectWrapper');
    expect(selectWrapper).toHaveAttribute('data-mode', 'rows');
  });

  /** Фиксируем корректное проставление значений data-status атрибута */
  it('Должен проставляться атрибут [data-status="default"] для плейсхолдера, если было прокинуто свойство "status: default"', async () => {
    render(
      <Select
        options={options}
        onChange={jest.fn()}
        selected={null}
        placeholder="placeholder"
      />
    );

    const placeholder = screen.queryByText('placeholder');
    expect(placeholder).toHaveAttribute('data-status', 'default');
  });
  it('Должен проставляться атрибут [data-status="invalid"] для плейсхолдера, если было прокинуто свойство "status: invalid"', async () => {
    render(
      <Select
        options={options}
        onChange={jest.fn()}
        selected={null}
        placeholder="placeholder"
        status="invalid"
      />
    );

    const placeholder = screen.queryByText('placeholder');
    expect(placeholder).toHaveAttribute('data-status', 'invalid');
  });
  it('Должен проставляться атрибут [data-status="default"] для плейсхолдера, если свойство status не указано', async () => {
    render(
      <Select
        options={options}
        onChange={jest.fn()}
        selected={null}
        placeholder="placeholder"
      />
    );

    const placeholder = screen.queryByText('placeholder');
    expect(placeholder).toHaveAttribute('data-status', 'default');
  });

  /** Фиксируем корректное проставление значений data-is-active атрибута */
  it('Должен проставляться атрибут [data-is-active="true"] для selectWrapper, при клике на плейсхолдер', async () => {
    const handleSelect = jest.fn();

    render(
      <Select
        options={options}
        onChange={handleSelect}
        selected={null}
        placeholder="placeholder"
        status="invalid"
      />
    );

    const placeholder = screen.getByText('placeholder');
    fireEvent.click(placeholder);

    const selectWrapper = screen.getByTestId('selectWrapper');

    expect(selectWrapper).toHaveAttribute('data-is-active', 'true');
  });
  it('Должен проставляться атрибут [data-is-active="false"](при открытом dropdown) для selectWrapper, при клике на плейсхолдер', async () => {
    const handleSelect = jest.fn();

    render(
      <Select
        options={options}
        onChange={handleSelect}
        selected={null}
        placeholder="placeholder"
        status="invalid"
      />
    );

    const placeholder = screen.getByText('placeholder');
    fireEvent.click(placeholder);
    fireEvent.click(placeholder);

    const selectWrapper = screen.getByTestId('selectWrapper');
    expect(selectWrapper).toHaveAttribute('data-is-active', 'false');
  });

  /** Фиксируем поведение открытия/закрытия выпадающего списка */
  it('По клику на плейсхолдер должен открываться dropdown', async () => {
    const handleSelect = jest.fn();

    render(
      <Select
        options={options}
        onChange={handleSelect}
        selected={null}
        placeholder="placeholder"
        status="invalid"
      />
    );

    const placeholder = screen.getByText('placeholder');
    fireEvent.click(placeholder);

    const selectDropdown = screen.getByTestId('selectDropdown');
    expect(selectDropdown).toBeInTheDocument();
  });
  it('По клику на плейсхолдер (при открытом dropdown) должен закрываться dropdown', async () => {
    const handleSelect = jest.fn();

    render(
      <Select
        options={options}
        onChange={handleSelect}
        selected={null}
        placeholder="placeholder"
        status="invalid"
      />
    );

    const placeholder = screen.getByText('placeholder');
    fireEvent.click(placeholder);
    fireEvent.click(placeholder);

    const selectDropdown = screen.queryByTestId('selectDropdown');
    expect(selectDropdown).not.toBeInTheDocument();
  });
  it('По клику на option должен вызываться обработчик "onChange" и закрываться dropdown', async () => {
    const handleSelect = jest.fn();

    render(
      <Select
        options={options}
        onChange={handleSelect}
        selected={null}
        placeholder="placeholder"
        status="invalid"
      />
    );

    const placeholder = screen.getByText('placeholder');
    fireEvent.click(placeholder);

    const option = screen.getByText(options[0].title);
    fireEvent.click(option);

    const optionAfterClick = screen.queryByText(options[0].title);

    expect(optionAfterClick).not.toBeInTheDocument();
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
  it('По клику за пределами селекта должен вызываться обработчик "onClose" и закрываться dropdown', async () => {
    const handleClose = jest.fn();

    render(
      <div>
        <div data-testid="1">outer element</div>
        <Select
          options={options}
          onChange={jest.fn()}
          onClose={handleClose}
          selected={null}
          placeholder="placeholder"
          status="invalid"
        />
      </div>
    );

    const placeholder = screen.getByText('placeholder');
    fireEvent.click(placeholder);

    const outerElement = screen.getByTestId('1');
    fireEvent.click(outerElement);

    const option = screen.queryByText(options[0].title);

    expect(option).not.toBeInTheDocument();
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
