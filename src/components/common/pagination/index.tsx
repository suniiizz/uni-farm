import { Stack, Pagination, styled } from "@mui/material";

const TablePagination = () => {
  return (
    <>
      <Stack spacing={2}>
        <Pagi count={2} variant="outlined" shape="rounded" />
      </Stack>
    </>
  );
};

export default TablePagination;

const Pagi = styled(Pagination)({
  "& .MuiButtonBase-root": {
    border: "none",
  },
  "& .MuiButtonBase-root.Mui-selected ": {
    backgroundColor: "white",
  },
});
