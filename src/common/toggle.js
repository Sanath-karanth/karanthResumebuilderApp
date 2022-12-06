import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// const CheckedIcon = () => <>🌜</>;
// const UncheckedIcon = () => <>🌞</>;

const CheckedIcon = () => (
  <>
    <FontAwesomeIcon icon={faSun} style={{ color: "#FCE570" }} />
  </>
);
const UncheckedIcon = () => (
  <>
    <FontAwesomeIcon icon={faMoon} style={{ color: "#F4F6F0" }} />
  </>
);

const ToggleButton = memo((props) => {
  const [toggle, setToggle] = useState(false);
  const { defaultChecked, onChange, disabled, className } = props;

  useEffect(() => {
    if (defaultChecked) {
      setToggle(defaultChecked);
    }
  }, [defaultChecked]);

  const triggerToggle = () => {
    if (disabled) {
      return;
    }

    setToggle(!toggle);

    if (typeof onChange === "function") {
      onChange(!toggle);
    }
  };

  const getIcon = (type) => {
    const { icons } = props;
    if (!icons) {
      return null;
    }

    return icons[type] === undefined
      ? ToggleButton.defaultProps.icons[type]
      : icons[type];
  };

  const toggleClasses = classNames(
    "wrg-toggle",
    {
      "wrg-toggle--checked": toggle,
      "wrg-toggle--disabled": disabled,
    },
    className
  );

  return (
    <div onClick={triggerToggle} className={toggleClasses}>
      <div className="wrg-toggle-container">
        <div className="wrg-toggle-check">
          <span>{getIcon("checked")}</span>
        </div>
        <div className="wrg-toggle-uncheck">
          <span>{getIcon("unchecked")}</span>
        </div>
      </div>
      <div className="wrg-toggle-circle"></div>
      <input
        type="checkbox"
        aria-label="Toggle Button"
        className="wrg-toggle-input"
      />
    </div>
  );
});

ToggleButton.defaultProps = {
  icons: {
    checked: <CheckedIcon />,
    unchecked: <UncheckedIcon />,
  },
};

ToggleButton.propTypes = {
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  icons: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      checked: PropTypes.node,
      unchecked: PropTypes.node,
    }),
  ]),
};

export default memo(ToggleButton);
