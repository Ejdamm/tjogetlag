import React, {useState} from "react";
import {useUrlData} from "./useUrlData";
import {Runner} from "./types";
import {Form as DomForm} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const RunnerForm = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [sex, setSex] = useState<'M' | 'F'>('M');
    const { addRunner } = useUrlData();

    const sanitizeName = (inputName: string) => {
        const sanitized = inputName.replace(/[^a-zA-ZåäöÅÄÖ\s]/g, '');
        setName(sanitized)
    }

    const sanitizeYear = (inputYear: string) => {
        const sanitized = inputYear.replace(/[^0-9]/g, '');
        if (sanitized.length > 4) {
            return;
        }
        setYear(sanitized)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const runner: Omit<Runner, 'id'> = {
            name: name.trim(),
            yearOfBirth: parseInt(year),
            sex
        };
        addRunner(runner)
    };

    return (
        <DomForm onSubmit={handleSubmit}>
            <Row>
                <Col sm={4}>
                    <Form.Control placeholder="Namn"
                                  type="text"
                                  autoComplete="off"
                                  value={name}
                                  required
                                  onChange={(e) => sanitizeName(e.target.value)}/>
                </Col>
                <Col sm={2}>
                    <Form.Control placeholder="Födelseår (ÅÅÅÅ)"
                                  type="text"
                                  autoComplete="off"
                                  value={year}
                                  required
                                  onChange={(e) => sanitizeYear(e.target.value)}/>
                </Col>
                <Col sm="auto">
                    <div key="inline-radio">
                        <Form.Check
                            inline
                            label="Herr"
                            type="radio"
                            name="sex"
                            id="inline-radio-1"
                            size={30}
                            defaultChecked
                            onSelect={() => setSex('M')}
                        />
                        <Form.Check
                            inline
                            label="Dam"
                            type="radio"
                            name="sex"
                            id="inline-radio-2"
                            onSelect={() => setSex('F')}
                        />
                    </div>
                </Col>
                <Col>
                    <Button variant="primary" type="submit">
                        Lägg till
                    </Button>
                </Col>
            </Row>
        </DomForm>
    );
}