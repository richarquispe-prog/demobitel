import { Fragment, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';

const Validation = () => {
    const { Formik } = formik;

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        file: yup.mixed().required(),
        terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
    });

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    return (
        <Fragment>
            <Row>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <Card.Title>
                                Custom Validation
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                           
                            <Form className="row g-3" noValidate validated={validated} onSubmit={handleSubmit}>
                                <Col md={4}>
                                    <Form.Label htmlFor="validationDefault01">First name</Form.Label>
                                    <Form.Control type="text" id="validationDefault01"
                                        defaultValue="Mark" required />
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="validationDefault02">Last name</Form.Label>
                                    <Form.Control type="text" id="validationDefault02"
                                        defaultValue="Otto" required />
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="validationDefaultUsername">Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="" id="inputGroupPrepend2">@</InputGroup.Text>
                                        <Form.Control type="text" id="validationDefaultUsername"
                                            aria-describedby="inputGroupPrepend2" required />
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <Form.Label htmlFor="validationDefault03">City</Form.Label>
                                    <Form.Control type="text" id="validationDefault03" required />
                                </Col>
                                <Col md={3}>
                                    <Form.Label htmlFor="validationDefault04">State</Form.Label>
                                    <Form.Select className="" id="validationDefault04" required defaultValue="Choose...">
                                        <option disabled >Choose...</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Col>
                                <Col md={3}>
                                    <Form.Label htmlFor="validationDefault05">Zip</Form.Label>
                                    <Form.Control type="text" id="validationDefault05" required />
                                </Col>
                                <div className="col-12">
                                    <Form.Check type="checkbox" label="Agree to terms and conditions" required />
                                </div>
                                <div className="col-12">
                                    <Button variant='primary' className="btn " type="submit">Submit form</Button>
                                </div>
                            </Form>
                                
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <Card.Title>
                                Browser default Validation
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form className="row g-3">
                                <Col md={4}>
                                    <Form.Label htmlFor="validationDefault01">First name</Form.Label>
                                    <Form.Control type="text" id="validationDefault01"
                                        defaultValue="Mark" required />
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="validationDefault02">Last name</Form.Label>
                                    <Form.Control type="text" id="validationDefault02"
                                        defaultValue="Otto" required />
                                </Col>
                                <Col md={4}>
                                    <Form.Label htmlFor="validationDefaultUsername">Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="" id="inputGroupPrepend2">@</InputGroup.Text>
                                        <Form.Control type="text" id="validationDefaultUsername"
                                            aria-describedby="inputGroupPrepend2" required />
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <Form.Label htmlFor="validationDefault03">City</Form.Label>
                                    <Form.Control type="text" id="validationDefault03" required />
                                </Col>
                                <Col md={3}>
                                    <Form.Label htmlFor="validationDefault04">State</Form.Label>
                                    <Form.Select className="" id="validationDefault04" required defaultValue="Choose...">
                                        <option disabled >Choose...</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Col>
                                <Col md={3}>
                                    <Form.Label htmlFor="validationDefault05">Zip</Form.Label>
                                    <Form.Control type="text" id="validationDefault05" required />
                                </Col>
                                <div className="col-12">
                                    <Form.Check type="checkbox" label="Agree to terms and conditions" required />
                                </div>
                                <div className="col-12">
                                    <Button variant='primary' className="btn " type="submit">Submit form</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xl={6}>
                    <Row>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header className="justify-content-between">
                                    <Card.Title>
                                        Server side Validation
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form className="row g-3">
                                        <Col md={4}>
                                            <Form.Label htmlFor="validationServer01">First
                                                name</Form.Label>
                                            <Form.Control type="text" className="form-control is-valid"
                                                id="validationServer01" defaultValue="Mark" required />
                                            <Form.Control.Feedback>
                                                Looks good!
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="validationServer02">Last
                                                name</Form.Label>
                                            <Form.Control type="text" className="form-control is-valid"
                                                id="validationServer02" defaultValue="Otto" required />
                                            <Form.Control.Feedback>
                                                Looks good!
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label htmlFor="validationServerUsername"
                                            >Username</Form.Label>
                                            <InputGroup className="has-validation">
                                                <InputGroup.Text className="input-group-text" id="inputGroupPrepend3">@</InputGroup.Text>
                                                <Form.Control type="text" className="form-control is-invalid"
                                                    id="validationServerUsername"
                                                    aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
                                                    required />
                                                <Form.Control.Feedback id="validationServerUsernameFeedback"
                                                    className="invalid-feedback">
                                                    Please choose a username.
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label htmlFor="validationServer03">City</Form.Label>
                                            <Form.Control type="text" className="form-control is-invalid"
                                                id="validationServer03"
                                                aria-describedby="validationServer03Feedback" required />
                                            <Form.Control.Feedback id="validationServer03Feedback" className="invalid-feedback">
                                                Please provide a valid city.
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="validationServer04">State</Form.Label>
                                            <Form.Select className="form-select is-invalid" id="validationServer04" defaultValue="Choose..."
                                                aria-describedby="validationServer04Feedback" required>
                                                <option disabled >Choose...</option>
                                                <option>...</option>
                                            </Form.Select>
                                            <Form.Control.Feedback id="validationServer04Feedback" className="invalid-feedback">
                                                Please select a valid state.
                                            </Form.Control.Feedback>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Label htmlFor="validationServer05">Zip</Form.Label>
                                            <Form.Control type="text" className="form-control is-invalid"
                                                id="validationServer05"
                                                aria-describedby="validationServer05Feedback" required />
                                            <Form.Control.Feedback id="validationServer05Feedback" className="invalid-feedback">
                                                Please provide a valid zip.
                                            </Form.Control.Feedback>
                                        </Col>
                                        <div className="col-12">
                                            <Form.Check required isInvalid label="Agree to terms and conditions" feedback="You must agree before submitting." feedbackType="invalid" />
                                        </div>
                                        <div className="col-12">
                                            <Button className="btn btn-primary" type="submit">Submit
                                                form</Button>
                                        </div>
                                    </Form>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={12}>
                            <Card className="custom-card">
                                <Card.Header className="justify-content-between">
                                    <Card.Title>
                                        Tooltips
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Formik
                                        validationSchema={schema}
                                        initialValues={{
                                            firstName: 'Mark',
                                            lastName: 'Otto',
                                            username: '',
                                            city: '',
                                            state: '',
                                            zip: '',
                                            file: null,
                                            terms: false,
                                        }}
                                    >
                                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <Row className="mb-3">
                                                    <Form.Group
                                                        as={Col}
                                                        md="4"
                                                        id="validationFormik101"
                                                        className="position-relative"
                                                    >
                                                        <Form.Label>First name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="firstName"
                                                            value={values.firstName}
                                                            onChange={handleChange}
                                                            isValid={touched.firstName && !errors.firstName}
                                                        />
                                                        <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group
                                                        as={Col}
                                                        md="4"
                                                        id="validationFormik102"
                                                        className="position-relative"
                                                    >
                                                        <Form.Label>Last name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="lastName"
                                                            value={values.lastName}
                                                            onChange={handleChange}
                                                            isValid={touched.lastName && !errors.lastName}
                                                        />

                                                        <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="4" id="validationFormikUsername2">
                                                        <Form.Label>Username</Form.Label>
                                                        <InputGroup hasValidation>
                                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Username"
                                                                aria-describedby="inputGroupPrepend"
                                                                name="username"
                                                                value={values.username}
                                                                onChange={handleChange}
                                                                isInvalid={!!errors.username}
                                                            />
                                                            <Form.Control.Feedback type="invalid" tooltip>
                                                                {errors.username}
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group
                                                        as={Col}
                                                        md="6"
                                                        id="validationFormik103"
                                                        className="position-relative"
                                                    >
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="City"
                                                            name="city"
                                                            value={values.city}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.city}
                                                        />

                                                        <Form.Control.Feedback type="invalid" tooltip>
                                                            {errors.city}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group
                                                        as={Col}
                                                        md="3"
                                                        id="validationFormik104"
                                                        className="position-relative"
                                                    >
                                                        <Form.Label htmlFor="validationTooltip04">State</Form.Label>
                                                        <Form.Select className="form-select" id="validationTooltip04" name="state"
                                                            value={values.state}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.state} required>
                                                            <option disabled defaultValue="">Choose...</option>
                                                            <option>...</option>
                                                        </Form.Select>
                                                        <Form.Control.Feedback type="invalid" tooltip>
                                                            {errors.state}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group
                                                        as={Col}
                                                        md="3"
                                                        id="validationFormik105"
                                                        className="position-relative"
                                                    >
                                                        <Form.Label>Zip</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Zip"
                                                            name="zip"
                                                            value={values.zip}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.zip}
                                                        />

                                                        <Form.Control.Feedback type="invalid" tooltip>
                                                            {errors.zip}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                                <Button type="submit">Submit form</Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xl={6}>
                    <Card className="custom-card">
                        <Card.Header className="justify-content-between">
                            <Card.Title>
                                Supported elements
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form className="was-validated">
                                <div className="mb-3">
                                    <Form.Label htmlFor="validationTextarea">Textarea</Form.Label>
                                    <Form.Control as="textarea" isInvalid className="" id="validationTextarea"
                                        placeholder="Required example textarea" required></Form.Control>
                                    <Form.Control.Feedback>
                                        Please enter a message in the textarea.
                                    </Form.Control.Feedback>
                                </div>
                                <Form.Check type="checkbox" className="form-check mb-3" id="validationFormCheck1"
                                    required isInvalid label="Check this checkbox" feedback="Example invalid feedback text" feedbackType='invalid' />
                                <Form.Check type="radio" className="" id="validationFormCheck2" name="radio-stacked"
                                    required isInvalid label="Toggle this radio" />
                                <Form.Check type="radio" className="form-check mb-3" id="validationFormCheck3" name="radio-stacked"
                                    required isInvalid label="Or toggle this other radio" feedback="More example invalid feedback textt" feedbackType='invalid' />
                                <Form.Group className="mb-3" >
                                    <Form.Select className="" required aria-label="select example" isInvalid>
                                        <option>Open this select menu</option>
                                        <option defaultValue="1">One</option>
                                        <option defaultValue="2">Two</option>
                                        <option defaultValue="3">Three</option>
                                    </Form.Select>
                                    <Form.Control.Feedback>Example invalid select feedback</Form.Control.Feedback>
                                </Form.Group>

                                <div className="mb-3">
                                    <Form.Control type="file" aria-label="file example"
                                        required />
                                    <Form.Control.Feedback>Example invalid form file feedback</Form.Control.Feedback>
                                </div>

                                <div className="mb-3">
                                    <Button variant='primary' className="btn " type="submit" disabled>Submit
                                        form</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};
export default Validation;
