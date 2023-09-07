import React, { ChangeEvent, Component } from 'react';

interface ValidatedInputProps {
  type: string;
  required?: boolean;
  pattern?: string;
  className?: string;
  value?: string;
}

interface ValidatedInputState {
  value: string;
  isValid: boolean;
}

class ValidatedInput extends Component<ValidatedInputProps, ValidatedInputState> {
  constructor(props: ValidatedInputProps) {
    super(props);
    this.state = {
      value: '',
      isValid: true,
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = this.validateInput(value);
    this.setState({ value, isValid });
  };

  validateInput = (value: string) => {
    if (this.props.required) {
      return value.trim() !== ''; // Check if the input is non-empty
    }
    return true; // If not required, consider it valid
  };

  render() {
    const {type, required, pattern, className, value } = this.props;
    const { isValid } = this.state;

    return (
      <div>
        <input
          type={type}
          value={value}
          onChange={this.handleChange}
          className={className}
          required={required}
          pattern={pattern}
        />
        {!isValid && (
          <p className="error-message" style={{ color: 'red' }}>
            Input cannot be empty.
          </p>
        )}
      </div>
    );
  }
}

export default ValidatedInput;
