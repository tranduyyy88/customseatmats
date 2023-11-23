import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { SelectedVariants } from "../pages/Product";

function Variants({ options, variants }) {
  const selectedVariants = useContext(SelectedVariants);
  const [listVariants, setListVariants] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({
    color: "",
    number: ""
  })

  useEffect(() => {
    async function loadOptions(){
      const data_option = await options;
    }
    async function loadVariants(){
      const data_variant = await variants;
      setListVariants(data_variant)
      setSelectedOptions({
        color: data_variant[0]?.selectedOptions[0]?.value,
        number: data_variant[0]?.selectedOptions[1]?.value
      })
      selectedVariants.setVariant(data_variant[0]?.id)
    }
    loadOptions();
    loadVariants();
  }, [variants,options])
  
  useEffect(() => {
    const variantSelected = listVariants.find((variants) => {
      return variants.selectedOptions[0]?.value == selectedOptions.color && variants.selectedOptions[1]?.value == selectedOptions.number
    });
    selectedVariants.setVariant(variantSelected?.id)
  },[selectedOptions])
  const handleChange = (event) => { 
    const value = event.target.value 
    if(event.target.getAttribute("name") == "Color"){      
      setSelectedOptions({
        ...selectedOptions,
        color: value
      })
    } else {
      setSelectedOptions({
        ...selectedOptions,
        number: value
      })
    }
    
  };

  return (
    <FormControl className="w-full gap-[20px] !mb-[30px]">
      {options?.map((option) => {
        return (
          <div className="option-item" key={option.id}>
            <FormLabel id="demo-radio-buttons-group-label">
              {option.name}:{" "}
              <span className="font-bold">{option.name == "Color" ? selectedOptions.color : selectedOptions.number}</span>
            </FormLabel>
            <RadioGroup
              defaultValue={option.values[0]}
              name={option.name}
              onChange={handleChange}
            >
              {option.values.map((value, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                );
              })}
            </RadioGroup>
          </div>
        );
      })}
    </FormControl>
  );
}
Variants.propTypes = {
  options: PropTypes.array,
  variants: PropTypes.array,
};
export default Variants;
