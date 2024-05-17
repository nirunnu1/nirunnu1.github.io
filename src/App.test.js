import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    it("should render Register component correctly", () => {
        render(<App />);
        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
    });
    // render(<App />);
    // const linkElement = screen.getByText(/learn react/i);
    // expect(linkElement).toBeInTheDocument();
});
