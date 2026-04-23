const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; // Reset singleton for tests
        controller = new Controller(service, mockView);
    });

   test('handleAddTodo should call service.addTodo and update the model', () => {
        const text = "Integration Test Todo";

        // 1. Gọi hàm handleAddTodo của controller
        controller.handleAddTodo(text);

        // 2. Lấy danh sách todos trực tiếp từ service
        const todos = service.getTodos();

        // 3. Assert (Kiểm chứng)
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        // 1. Thêm trực tiếp một todo vào service để làm dữ liệu mẫu
        service.addTodo("Task to delete");
        
        // 2. Lấy ID của todo vừa tạo
        const id = service.getTodos()[0].id;

        // 3. Gọi hàm handleRemoveTodo của controller với ID đó
        controller.handleRemoveTodo(id);

        // 4. Kiểm chứng mảng todos trong service phải trống
        expect(service.getTodos().length).toBe(0);
    });
});
