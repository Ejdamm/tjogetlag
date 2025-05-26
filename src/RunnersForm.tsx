import React, {useEffect, useState} from "react";
import {useUrlData} from "./useUrlData";
import {Runner} from "./types";
import {Form as DomForm} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface RunnerFormProps {
    selectedRunner?: Runner | null;
    resetSelectedRunner: () => void;
}

export const RunnerForm: React.FC<RunnerFormProps> = ({ selectedRunner, resetSelectedRunner }) => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [sex, setSex] = useState<'M' | 'F'>('M');
    const { addRunner, updateRunner } = useUrlData();

    useEffect(() => {
        if (selectedRunner) {
            setYear(selectedRunner.yearOfBirth.toString());
            setName(selectedRunner.name);
            setSex(selectedRunner.sex)
        }
    }, [selectedRunner]);

    const resetLocalState = () => {
        setYear('');
        setName('');
    }

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
        if (selectedRunner) {
            updateRunner({ ...runner, id: selectedRunner.id });
            resetSelectedRunner();
        } else {
            addRunner(runner)
        }
        resetLocalState();
    };

    return (
        <DomForm onSubmit={handleSubmit}>
            <Row className="g-2">
                <Col md={4}>
                    <Form.Control placeholder="Namn"
                                  type="text"
                                  autoComplete="off"
                                  value={name}
                                  required
                                  onChange={(e) => sanitizeName(e.target.value)}/>
                </Col>
                <Col md={3}>
                    <Form.Control placeholder="Födelseår (ÅÅÅÅ)"
                                  type="text"
                                  autoComplete="off"
                                  value={year}
                                  required
                                  onChange={(e) => sanitizeYear(e.target.value)}/>
                </Col>
                <Col md="auto">
                    <div key="inline-radio">
                        <Form.Check
                            inline
                            label="Herr"
                            type="radio"
                            name="sex"
                            id="inline-radio-1"
                            size={30}
                            checked={sex === 'M'}
                            onChange={() => setSex('M')}
                        />
                        <Form.Check
                            inline
                            label="Dam"
                            type="radio"
                            name="sex"
                            id="inline-radio-2"
                            checked={sex === 'F'}
                            onChange={() => setSex('F')}
                        />
                    </div>
                </Col>
                <Col md="auto">
                    <Button variant="success" type="submit">
                        {selectedRunner ? 'Uppdatera' : 'Lägg till'}
                    </Button>
                </Col>
                {selectedRunner ? <Col md="auto">
                    <Button variant="secondary" type="reset" onClick={() => {
                        resetLocalState();
                        resetSelectedRunner();
                    }}>
                        Avbryt
                    </Button>
                </Col> : null}
            </Row>
        </DomForm>
    );
}