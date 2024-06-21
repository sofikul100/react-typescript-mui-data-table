import { TextField, Stack, Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, SubmitHandler } from "react-hook-form";

interface Form {
  name: string;
  email: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email("Field Must Be A Email").required(),
  })
  .required();

const Practices = () => {
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<Form>({
      resolver: yupResolver(schema)
  });

  const CustomSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(CustomSubmit)}>
        <Stack direction="row" alignItems={"center"} gap={4}>
          <TextField
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
            {...register("name")}
          />
            <p style={{color:'red'}}>{errors.name?.message}</p>
          <TextField
            id="outlined-basic"
            label="Enter Email"
            variant="outlined"
            {...register("email")}
          />
          <p style={{color:'red'}}>{errors.email?.message}</p>
          <Button type="submit" variant="contained">Submit</Button>
        </Stack>
      </form>
    </div>
  );
};

export default Practices;
