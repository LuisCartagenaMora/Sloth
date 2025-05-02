import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["View Expenses", "About Me", "Logout"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={text}
                onClick={() => {
                  console.log(text);
                  if (index === 0) {
                    navigate("/expenses");
                  } else if (index === 1) {
                    navigate("/about");
                  } else if (index === 2) {
                    navigate("/home");
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  return (
    <>
      <header className="mdc-top-app-bar">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <div>
              {/* Uncomment to use the drawer. Might use if there are more options
              to add here. Too little options to use. */}

              {/* <Button onClick={toggleDrawer(true)}>
                <MenuIcon fontSize="large" color="action"></MenuIcon>
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer> */}
            </div>
            <span className="mdc-top-app-bar__title">Sloth Expenses</span>
          </section>
          <section
            className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
            role="toolbar"
          >
            <Button
              onClick={() => {
                navigate("/home");
              }}
            >
              Logout
            </Button>
            {/*               <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Favorite">favorite</button> */}
            {/*               <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search">search</button> */}
            {/*               <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options">more_vert</button> */}
            {/* <Button>
              <FormGroup>
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      color: "white",
                    },
                  }}
                  control={<Switch color="default" />}
                  label="Light/Dark Mode"
                />
              </FormGroup>
            </Button> */}
          </section>
        </div>
      </header>
      <main className="mdc-top-app-bar--fixed-adjust"></main>
    </>
  );
}
