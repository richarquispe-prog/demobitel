
import React, { Fragment, useEffect, useState } from "react";
import { Range, getTrackBackground, checkValuesAgainstBoundaries } from "react-range";

const LabeledTwoThumbs = ({ rtl }) => {
  const STEP = 0.1;
  const MIN = 0;
  const MAX = 100;

  const [values, setValues] = useState([20, 40]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(newValues) => setValues(newValues)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              className="rangeslider-thumb"
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["var(--black-1)", "var(--primary-color)", "var(--black-1)"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <Fragment key={index}>
            <div
              {...props}

              key={index}

              style={{
                ...props.style,
                top: "14px",
                height: "20px",
                width: "24px",
                borderRadius: "4px",
                backgroundColor: "var(--custom-white)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px var(--black-1)",
              }}

            >
              <Fragment key={index}>
                <div
                  style={{
                    position: "absolute",
                    top: "-28px",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Arial, Helvetica Neue, Helvetica, sans-serif",
                    padding: "4px",
                    borderRadius: "4px",
                    backgroundColor: "var(--primary-color)",
                  }}
                >
                  {values[index].toFixed(1)}
                </div>
                <div
                  style={{
                    height: "16px",
                    width: "5px",
                    backgroundColor: isDragged ? "var(--primary-color)" : "var(--black-1)",
                  }}
                />
              </Fragment>
            </div>
          </Fragment>
        )}
      />
    </div>
  );
};

export default LabeledTwoThumbs;

export const Marks = ({ rtl }) => {
  const STEP = 10;
  const MIN = 0;
  const MAX = 100;

  const [values, setValues] = useState([50]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(newValues) => setValues(newValues)}
        renderMark={({ props, index }) => (
          <div
            {...props}
            key={`mark-${index} *66`}
            style={{
              ...props.style,
              height: "16px",
              width: "5px",
              backgroundColor: index * STEP < values[0] ? "var(--primary-color)" : "var(--default-background)",
              position: 'absolute',
              left: rtl ? undefined : `${(index / (MAX / STEP)) * 100}%`,
              right: rtl ? `${(index / (MAX / STEP)) * 100}%` : undefined,
              transform: rtl ? 'translateX(0%)' : 'translateX(0%)',
            }}
          />
        )}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              className="rangeslider-thumb"
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["var(--primary-color)", "var(--default-background)"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            key="thumb"
            style={{
              ...props.style,
              height: "35px",
              width: "35px",
              borderRadius: "4px",
              backgroundColor: "var(--primary-color)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 16px 0 rgba(169,184,200,.15)",
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#fff" : "#fff",
              }}
            />
          </div>
        )}
      />
    </div>
  );
};


export const ProgrameticSlider = ({ rtl }) => {

  const STEP = 0.1;
  const MIN = 0;
  const MAX = 100;

  const [values, setValues] = useState([50]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%"
            }}
          >
            <div className="rangeslider-thumb"
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#5a66f1", "var(--black-1)"],
                  min: MIN,
                  max: MAX,
                  rtl
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              borderRadius: "4px",
              backgroundColor: "var(--custom-white)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px var(--black-1)"
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#5a66f1" : "var(--black-1)"
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export const UpdatingMarks = ({ rtl }) => {
  const [values, setValues] = useState([50]);
  const [selectedMax, setSelectedMax] = useState(100);
  const [maxOptions] = useState([100, 150, 200, 250, 300]);

  const [selectedMin, setSelectedMin] = useState(0);
  const [minOptions] = useState([0, 15, 20, 25, 30]);

  const [selectedStep, setSelectedStep] = useState(1);
  const [stepOptions] = useState([0.5, 1, 5, 10, 20]);

  useEffect(() => {
    const valuesCopy = [...values].map((value) =>
      checkValuesAgainstBoundaries(value, selectedMin, selectedMax)
    );
    setValues(valuesCopy);
  }, [selectedMin, selectedMax, selectedStep]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
      }}
    >
      <Range
        values={values}
        step={selectedStep}
        min={selectedMin}
        max={selectedMax}
        rtl={rtl}
        onChange={(values) => setValues(values)}
        renderMark={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "2px",
              backgroundColor:
                index * selectedStep + selectedMin < values[0]
                  ? "#5a66f1"
                  : "var(--black-1)"
            }}
          />
        )}
        renderTrack={({ props, children }) => (
          <div className="rangeslider-thumb"
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%"
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "3px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#5a66f1", "var(--black-1)"],
                  min: selectedMin,
                  max: selectedMax,
                  rtl
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "52px",
              width: "22px",
              borderRadius: "4px",
              backgroundColor: "var(--custom-white)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px var(--black-1)"
            }}
          >
            <div
              style={{
                height: "16px",
                width: "3px",
                backgroundColor: isDragged ? "#5a66f1" : "var(--black-1)"
              }}
            />
          </div>
        )}
      />
      <div className="w-full">
        <output
          style={{
            display: "flex",
            justifyContent: "center",
            top: "20px",
            position: "relative",
          }}
        >
          <span style={{ backgroundColor: "rgba(90,102,241,0.1)", color: "#5a66f1", padding: "6px", }}>{values[0].toFixed(1)}</span>
        </output>
        <div
          style={{
            top: "25px",
            position: "relative",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "15px"
            }}
          >
            <p className="mb-2">Select range max:</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(10px, 1fr))",
                gridGap: "10px"
              }}
            >
              {maxOptions.map((val, idx) => (
                <button
                  key={`${idx}-${val}`}
                  id={`_${idx}-${val}`}
                  data-max={val}
                  style={{
                    backgroundColor: val === selectedMax ? "#5a66f1" : "#fff",
                    color: val === selectedMax ? "#fff" : "#000",
                    padding: "5px 10px",
                    border:
                      val === selectedMax
                        ? "1px solid #5a66f1"
                        : "1px solid #eff0f6",
                    fontSize: "12px",
                    fontWeight: val === selectedMax ? 600 : 400,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.07)"
                  }}
                  onClick={(e) => {
                    const el = e.target;
                    const newMax = el.dataset;
                    setSelectedMax((prev) =>
                      newMax !== undefined && newMax.max !== undefined
                        ? +newMax.max
                        : prev
                    );
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "15px"
            }}
          >
            <p className="mb-2">Select range min:</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(10px, 1fr))",
                gridGap: "10px"
              }}
            >
              {minOptions.map((val, idx) => (
                <button
                  key={`${idx}-${val}`}
                  id={`_${idx}-${val}`}
                  data-min={val}
                  style={{
                    backgroundColor: val === selectedMin ? "#5a66f1" : "#fff",
                    color: val === selectedMin ? "#fff" : "#000",
                    padding: "5px 10px",
                    border:
                      val === selectedMin
                        ? "1px solid #5a66f1"
                        : "1px solid #eff0f6",
                    fontSize: "15px",
                    fontWeight: val === selectedMin ? 600 : 400,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.07)"
                  }}
                  onClick={(e) => {
                    const el = e.target;
                    const newMin = el.dataset;
                    setSelectedMin((prev) =>
                      newMin !== undefined && newMin.min !== undefined
                        ? +newMin.min
                        : prev
                    );
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
          >
            <p className="mb-2">Select step:</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(10px, 1fr))",
                gridGap: "10px"
              }}
            >
              {stepOptions.map((val, idx) => (
                <button key={`${idx}-${val}`} id={`_${idx}-${val}`} data-step={val}
                  style={{
                    backgroundColor: val === selectedStep ? "#5a66f1" : "#fff",
                    color: val === selectedStep ? "#fff" : "#000",
                    padding: "5px 10px",
                    border:
                      val === selectedStep
                        ? "1px solid #5a66f1"
                        : "1px solid #eff0f6",
                    fontSize: "15px",
                    fontWeight: val === selectedStep ? 600 : 400,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.07)"
                  }}
                  onClick={(e) => {
                    const el = e.target;
                    const newStep = el.dataset;
                    setSelectedStep((prev) =>
                      newStep !== undefined && newStep.step !== undefined
                        ? +newStep.step
                        : prev
                    );
                  }}
                > {val} </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

