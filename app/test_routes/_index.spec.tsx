import { createRemixStub } from "@remix-run/testing";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import {test,expect, describe, afterEach} from "vitest";
import IndexPage, {loader, meta, action} from "../routes/_index";

describe("Index page", () => {
    const RemixStub = createRemixStub([
        {
            path: "/",
            Component: IndexPage,
            loader,
            meta,
            action
        },
    ]);
    
    const indexPageRender = render(<RemixStub />);

    afterEach(() => {
        indexPageRender.rerender(<RemixStub />);
    });

    test("initial render works as expected", async () => {
          const todoTitle =  await screen.findByText("TODO");
          expect(todoTitle).toBeInTheDocument()
          const newTodoTextInput =  await screen.findByPlaceholderText<HTMLInputElement>("Add a new todo");
          expect(newTodoTextInput ).toBeInTheDocument();
          expect(newTodoTextInput.value).toBe('') // empty before
          const addButton =  await screen.findByTestId("add-todo-button");
          expect(addButton ).toBeInTheDocument(); 
      });
      
    test("create a todo", async () => {
        const newTodoTextInput =  await screen.findByPlaceholderText<HTMLInputElement>("Add a new todo");
        const addButton =  await screen.findByTestId("add-todo-button");

        await fireEvent.change(newTodoTextInput, {target: {value: "first todo"}});
        await fireEvent.click(addButton);
        const newTodoItem =  await screen.findByText("first todo");
        expect(newTodoItem ).toBeInTheDocument();        
    });

    test("create 2 todos", async () => {
        const newTodoTextInput =  await screen.findByPlaceholderText<HTMLInputElement>("Add a new todo");
        const addButton =  await screen.findByTestId("add-todo-button");

        await fireEvent.change(newTodoTextInput, {target: {value: "first todo"}});
        await fireEvent.click(addButton);
        const newTodoItem1 =  await screen.findByText("first todo");
        expect(newTodoItem1 ).toBeInTheDocument();        

        await fireEvent.change(newTodoTextInput, {target: {value: "second todo"}});
        await fireEvent.click(addButton);
        const newTodoItem2 =  await screen.findByText("second todo");
        expect(newTodoItem2 ).toBeInTheDocument();        
    });

    test("submit with empty fild should return an error", async () => {
        const newTodoTextInput =  await screen.findByPlaceholderText<HTMLInputElement>("Add a new todo");
        const addButton =  await screen.findByTestId("add-todo-button");

        await fireEvent.change(newTodoTextInput, {target: {value: ""}});
        await fireEvent.click(addButton);
        
        const errorMessage =  await screen.findByText("Text can't be empty");
        expect(errorMessage ).toBeInTheDocument();        

    });

});

