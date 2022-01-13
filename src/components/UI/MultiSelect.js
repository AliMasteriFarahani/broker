import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect(props) {
    const theme = useTheme();
    let personName = props.personName;
    let categories = props.categories;
    let names = categories;

    return (
        <div>
            <FormControl sx={{ mr: 1, width: 200 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select labelId="demo-multiple-name-label" id="demo-multiple-name" multiple value={personName} onChange={props.change} input={<OutlinedInput label="Name" />} MenuProps={MenuProps}>
                    {names.map((name) => (
                        <MenuItem key={name.id} value={name.slug} style={getStyles(name, personName, theme)}>
                            {name.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
