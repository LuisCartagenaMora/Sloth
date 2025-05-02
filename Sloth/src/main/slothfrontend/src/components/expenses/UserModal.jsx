import React from "react";
import { Box, Button, Modal } from "@mui/material";
import RegisterCard from "../menu/RegisterCard";
import LoginCard from "../menu/LoginCard";

export default function UserModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          handleOpen();
        }}
      >
        START MANAGING YOUR EXPENSES
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <RegisterCard />
        {/* <LoginCard /> */}
      </Modal>
    </>
  );
}
