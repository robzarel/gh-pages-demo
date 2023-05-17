import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import RadioGroup from "./index";
import options from "./options.json";

describe("React component: RadioGroup", () => {
  it('Должен проставляться атрибут [data-checked="true"] на option, если было выбрано его значение', async () => {
    const groupName = "some-name";
    render(
      <RadioGroup
        selected={options[2].value}
        name={groupName}
        onChange={jest.fn()}
        options={options}
      />
    );
    const inputId = `${groupName}_radio_item_with_value__${options[2].value}`;

    const radioItem = screen.getByTestId(inputId);
    expect(radioItem).toHaveAttribute("data-checked", "true");
  });

  it('Должен вызываться обработчик "onChange" при клике на option', async () => {
    const groupName = "some-name";
    const handleChange = jest.fn();

    render(
      <RadioGroup
        selected={options[2].value}
        name={groupName}
        onChange={handleChange}
        options={options}
      />
    );

    const label = screen.getByLabelText(options[2].title);
    fireEvent.click(label);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
