import React from "react";
import { Button, Modal } from "@mui/material";
import RegisterCard from "../menu/RegisterCard";

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
        sx={{ mr: 1 }}
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
      </Modal>
    </>
  );
}
