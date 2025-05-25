import React, {useState} from "react";
import {useUrlData} from "./useUrlData";
import {Runner} from "./types";
import {Form} from "react-router-dom";

export const RunnerForm = () => {
    const [name, setName] = useState('');
    const { addRunner } = useUrlData();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const runner: Omit<Runner, 'id'> = { name: name.trim() };
        addRunner(runner)
    };

    return (
        <Form onSubmit={handleSubmit} className="p-3">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Namn</label>
                <input type="text"
                       autoComplete="off"
                       name="name"
                       id="name"
                       className="form-control"
                       placeholder="Namn"
                       value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Lägg till</button>
        </Form>
    );
}