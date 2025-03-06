import React, { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const Automatizacion = () => {
    return (
        <Fragment>
            <Row className="row-sm">
                <Col xl={12}>
                    <Card className="custom-card">
                        <Card.Header>
                            <Card.Title>Automatización Dashboard</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <p className="mb-0">Welcome to the Automatización Dashboard. This page provides tools and metrics for process automation and workflow optimization.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Automatizacion;