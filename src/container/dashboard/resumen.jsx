import React, { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Resumen = () => {
    return (
        <Fragment>
            <Row className="row-sm">
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Resumen Dashboard</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-0">Welcome to the Resumen Dashboard. This page provides a summary overview of key metrics and performance indicators.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Resumen;