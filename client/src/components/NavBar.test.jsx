import NavBar from './NavBar';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


describe("NavBar component", () => {
    const renderNavBar = () => {
        render(<NavBar />, { wrapper: MemoryRouter});
    };
    test("renders both links", () => {
        //render the navbar
        renderNavBar();
        //expect the links to be there
        expect(screen.getByText("Posts List")).toBeInTheDocument();
        expect(screen.getByText("Create New Post")).toBeInTheDocument();
    });
});