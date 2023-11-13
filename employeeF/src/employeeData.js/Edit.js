import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditData, getData } from "../feature/employeeDataSlice";

const Edit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.EmployeeData?.data?.employee);
  const loader = useSelector((state) => state.EmployeeData.loading);

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Title is Required")
      .trim()
      .min(3, "Title Must be at Least 3 Characters Long")
      .max(50, "Title Must be at Most 50 Characters Long"),
    firstName: yup
      .string()
      .required("First Name is Required")
      .trim()
      .min(3, "First Name Must be at Least 3 Characters Long")
      .max(50, "First Name  Must be at Most 50 Characters Long"),
    lastName: yup
      .string()
      .required("Last Name is Required")
      .trim()
      .min(3, "Last Name Must be at Least 3 Characters Long")
      .max(50, "Last Name  Must be at Most 50 Characters Long"),
    phone: yup
      .string()
      .required("Phone is Required"),
    email: yup
      .string()
      .required("Email is Required")
      .email("Invalid Email Format"),
    address: yup
      .string()
      .required("Address is Required")
      .trim()
      .min(3, "Address Must be at Least 3 Characters Long")
      .max(50, "Address  Must be at Most 50 Characters Long"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data, e) => {
     try {
      await dispatch(EditData({ _id: params.id, ...data }));
      e.target.reset();
      navigate("/")
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    dispatch(getData(params.id));
  }, [params.id]);

  useEffect(() => {
    setValue("title", data?.title || "");
    setValue("firstName", data?.firstName || "");
    setValue("lastName", data?.lastName || "");
    setValue("phone", data?.phone || "");
    setValue("address", data?.address || "");
    setValue("email", data?.email || "");
  }, [data]);

  if (loader) {
    return <h1>Loader</h1>;
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1>Update Employee Data</h1>
          <hr />
          <Form.Group controlId="formEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              {...register("title")}
              type="text"
              placeholder="Enter Title Name"
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              {...register("firstName")}
              type="text"
              placeholder="Enter First Name"
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              {...register("lastName")}
              type="text"
              placeholder="Enter Last Name"
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              {...register("phone")}
              type="tel" // Change this line to type="tel"
              placeholder="Enter Phone Number"
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Address</Form.Label>
            <Form.Control
              {...register("address")}
              type="text"
              placeholder="Enter Address"
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register("email")}
              type="email" // Change this line
              placeholder="Enter Email"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <hr />
          <div className="buttonSubCan">
            <Button type="submit" className="registerbtns">
              Submit
            </Button>
            <div className="cancel">
              <Button
                onClick={() => navigate("/")}
                className="registerbtn cancel"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </form>
  );
};

export default Edit;
