import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postData } from "../feature/employeeDataSlice";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data, e) => {
    console.log("Form submitted:", data);

    try {
      // Dispatch the action and wait for it to complete
      await dispatch(postData(data));

      // Reset the form only if the dispatch is successful
      e.target.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1>Create Employee Data</h1>
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

export default Create;
