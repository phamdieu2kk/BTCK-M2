import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
  Divider,
  Stack,
  Paper,
} from "@mui/material";

import { CarsContext } from "../../contexts/CarsContext";
import { ActionKind } from "../../contexts/CarsContext";

type FilterDataType = {
  title: string;
  options: string[];
}[];

export default function Filter() {
  const filterData: FilterDataType = [
    {
      title: "TYPE",
      options: ["Sport", "SUV", "MVP", "Sedan", "Coupe", "Hatchback"],
    },
    {
      title: "CAPACITY",
      options: ["2", "4", "6", "8"],
    },
  ];

  const { dispatch } = useContext(CarsContext);
  const [checked, setChecked] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecks = [...checked];
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setChecked([...newChecks, e.target.value]);
      } else {
        const index = newChecks.indexOf(e.target.value);
        if (index !== -1) {
          newChecks.splice(index, 1);
          setChecked([...newChecks]);
        }
      }
    }
  };

  const handlePriceChange = (_: Event, value: number | number[]) => {
    setPrice(typeof value === "number" ? value : value[0]);
  };

  useEffect(() => {
    dispatch({ type: ActionKind.Filter_Type_Query, payload: checked });
  }, [checked]);

  useEffect(() => {
    dispatch({ type: ActionKind.Filter_Price_Query, payload: price });
  }, [price]);

  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: "#dadee2",
        padding: 3,
        width: "100%",
        maxWidth: 250,
        height: "86vh",
        overflowY: "auto",
      }}
    >
      <Stack spacing={3}>
        {filterData.map((data) => (
          <Box key={data.title}>
            <Typography variant="h6" gutterBottom>
              {data.title}
            </Typography>
            <Stack spacing={1}>
              {data.options.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      value={option}
                      checked={checked.includes(option)}
                      onChange={handleChange}
                    />
                  }
                  label={option}
                />
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
          </Box>
        ))}

        {/* Price Range */}
        <Box>
          <Typography variant="h6" gutterBottom>
            PRICE
          </Typography>
          <Slider
            value={price}
            onChange={handlePriceChange}
            min={0}
            max={3000}
            step={50}
            valueLabelDisplay="auto"
          />
          <Typography variant="body2">Price Range – ${price}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
