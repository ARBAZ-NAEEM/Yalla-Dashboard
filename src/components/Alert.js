import Swal from "sweetalert2";
export const SuccessAlert = () => {
  Swal.fire("Saved Successfully!", "", "success");
};

export const UpdateAlert = () => {
  Swal.fire("Successfully Updated!", "", "success");
};

export const AlreadyExistAlert = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Record Already Exist!",
  });
};

export const DeleteAlert = () => {
  Swal.fire("Successfully Deleted!", "", "success");
};

export const SomeThingWentWrong = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: "",
  });
};

export const CustomErrorMessage = (msg) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
    footer: "",
  });
};

export const CustomWarningMessage = (msg) => {
  Swal.fire({
    icon: "warning",
    title: "Warning",
    text: msg,
    footer: "",
  });
};

export const CustomSuccessAlert = (msg) => {
  Swal.fire(msg, "", "success");
};

export const SuccessWithConfirmation = (msg) => {
  return Swal.fire(msg, "", "success");
};

export const WarningWithConfirmation = (msg) => {
  return Swal.fire({
    title: "Are you sure?",
    text: msg,
    icon: "warning",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
};

export const ErrorWithConfirmation = (msg) => {
  return Swal.fire({
    title: "Oops",
    text: msg,
    icon: "error",
    showConfirmButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Yes",
  });
};

export const DeleteWithConfirmation = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Reject it!",
  });
};
