import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { AlertContext } from "../context/context";
import { AlertProvider } from "../context/alertContext";
import { useContext, useState } from "react";
import { SEVERITY } from "../constants/severity";
import { VARIANT } from "../constants/variant";
import { HORIZONTAL, VERTICAL } from "../constants/position";
import React from "react";

export const AlertDemo = () => {
  const [horizontal, setHorizontal] = useState<HORIZONTAL>("right");
  const [vertical, setVertical] = useState<VERTICAL>("top");

  const handlePostionChange = (position: string) => {
    const [vertical, horizontal] = position.split(" ");
    setVertical(vertical as never);
    setHorizontal(horizontal as never);
  };
  return (
    <Box
      display="flex"
      width="100hw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <AlertProvider
        alertGlobalProps={{
          stackAlerts: true,
          horizontal: horizontal,
          vertical: vertical,
          classes: { icon: "alert-icon-class" },
        }}
      >
        <AlertTest
          horizontal={horizontal}
          vertical={vertical}
          handlePositionChange={handlePostionChange}
        />
      </AlertProvider>
    </Box>
  );
};

const AlertTest = ({
  horizontal,
  vertical,
  handlePositionChange,
}: {
  horizontal: HORIZONTAL;
  vertical: VERTICAL;
  handlePositionChange: (position: string) => void;
}) => {
  const { alert, closeAllAlerts } = useContext(AlertContext);
  const [count, setCount] = useState<number>(0);
  const [severity, setSeverity] = useState<SEVERITY>("success");
  const [variant, setVariant] = useState<VARIANT>("standard");

  const show = () => {
    setCount((prev) => prev + 1);
    alert({
      message:
        "Hello there! You are welcome" +
        (count > 1
          ? "DSFJLKSDJFLKJDSLFJ LKJDF LDJSFLKJDL FJLDKJ LSDKJFL KSDJF"
          : ""),
      severity: severity,
      variant: variant,
    });
  };
  return (
    <>
      <Box minWidth="400px">
        <Typography variant="h3">Settings</Typography>
        <Box display="flex">
          <Box>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Severity
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={severity}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(_e, value: any) => setSeverity(value)}
              >
                <FormControlLabel
                  value={"error"}
                  control={<Radio />}
                  label={"error"}
                />
                <FormControlLabel
                  value={"success"}
                  control={<Radio />}
                  label={"success"}
                />
                <FormControlLabel
                  value={"info"}
                  control={<Radio />}
                  label={"info"}
                />
                <FormControlLabel
                  value={"warning"}
                  control={<Radio />}
                  label={"warning"}
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Position
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={`${vertical} ${horizontal}`}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(_e, value: any) => handlePositionChange(value)}
              >
                <FormControlLabel
                  value={"top left"}
                  control={<Radio />}
                  label={"Top Left"}
                />
                <FormControlLabel
                  value={"top center"}
                  control={<Radio />}
                  label={"Top Center"}
                />
                <FormControlLabel
                  value={"top right"}
                  control={<Radio />}
                  label={"Top Right"}
                />
                <FormControlLabel
                  value={"bottom left"}
                  control={<Radio />}
                  label={"Bottom Left"}
                />
                <FormControlLabel
                  value={"bottom center"}
                  control={<Radio />}
                  label={"Bottom Center"}
                />
                <FormControlLabel
                  value={"bottom right"}
                  control={<Radio />}
                  label={"Bottom Right"}
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Variant
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={variant}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(_e, value: any) => setVariant(value)}
              >
                <FormControlLabel
                  value={"standard"}
                  control={<Radio />}
                  label={"standard"}
                />
                <FormControlLabel
                  value={"filled"}
                  control={<Radio />}
                  label={"filled"}
                />
                <FormControlLabel
                  value={"outlined"}
                  control={<Radio />}
                  label={"outlined"}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Button variant="contained" onClick={show}>
        Click Me
      </Button>
      <Button variant="contained" onClick={closeAllAlerts}>
        Clear All Alerts
      </Button>
    </>
  );
};
