import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import FormHelperText from "@mui/material/FormHelperText";

import { LOGIN } from "../graphql/mutations";
import { useAuth } from "../context/AppProvider";

export const LoginForm = ({ isMobile }) => {
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data?.login?.success) {
      const { token, user } = data.login;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsLoggedIn(true);

      navigate("/dashboard", { replace: true });
    }
  }, [data, navigate, setUser, setIsLoggedIn]);

  const onSubmit = (formData) => {
    login({
      variables: {
        loginInput: {
          email: formData.email,
          password: formData.password,
        },
      },
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Paper sx={{ p: 3, minWidth: isMobile ? "90%" : "400px" }} elevation={6}>
      <Typography component="h1" variant="h4" align="center">
        Login
      </Typography>
      <Divider />
      <Stack
        component="form"
        sx={{ p: 3 }}
        spacing={4}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <TextField
            error={!!errors.email}
            label="Email"
            variant="outlined"
            helperText={!!errors.email ? "Please enter a valid email." : ""}
            {...register("email", {
              required: true,
            })}
          />
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel
              error={!!errors.password}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              error={!!errors.password}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    onMouseDown={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              {...register("password", {
                required: true,
              })}
            />
            {!!errors.password && (
              <FormHelperText
                error={!!errors.password}
                id="outlined-weight-helper-text"
              >
                Please enter a valid password.
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
        <Stack spacing={2}>
          <LoadingButton variant="contained" type="submit" loading={loading}>
            Login
          </LoadingButton>
          <Typography variant="caption" component="div" align="center">
            Don't have an account? <Link href="/sign-up">Sign up</Link>
          </Typography>
          {error && (
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "red" }}
              align="center"
            >
              Failed to login. Please try again.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
