const { TodoService } = require('../../js/model');

describe('TodoService Unit Tests', () => {
    let service;

    beforeEach(() => {
        // Create a new service instance for each test to ensure isolation
        service = new TodoService();
        // This is a bit of a hack to reset the singleton for testing purposes
        service.todos = [];
    });

   
    test('should add a new todo', () => {
        // TODO: Call the addTodo method with some text.
        // Then, assert that the service's todos array has a length of 1.
        // Assert that the text of the first todo matches the input text.
        text = "Some text"
        service.addTodo("Some text")
        expect(service.todos.length).toBe(1);
        expect(service.todos[0].text).toMatch(text);
    });

  test('should toggle the completed state of a todo', () => {
        // 1. Thêm một todo
        service.addTodo("Learn Testing");
        
        // Lấy ID của todo vừa thêm
        const id = service.todos[0].id;

        // 2. Gọi hàm toggleTodoComplete lần đầu
        service.toggleTodoComplete(id);
        
        // Kiểm tra xem trạng thái 'completed' đã chuyển thành true chưa
        expect(service.todos[0].completed).toBe(true);

        // 3. Gọi hàm toggleTodoComplete lần nữa
        service.toggleTodoComplete(id);
        
        // Kiểm tra xem trạng thái đã quay về false chưa
        expect(service.todos[0].completed).toBe(false);
    });

    test('should remove a todo', () => {
        // 1. Thêm một todo
        service.addTodo("Task to be removed");
        
        // Lấy ID của todo đó
        const id = service.todos[0].id;

        // 2. Gọi hàm removeTodo để xóa
        service.removeTodo(id);

        // 3. Kiểm tra xem mảng todos có trống (độ dài = 0) không
        expect(service.todos.length).toBe(0);
    });

    test('should not add a todo if text is empty', () => {
        // 1. Gọi hàm addTodo với chuỗi rỗng
        service.addTodo("");

        // 2. Kiểm tra xem mảng todos vẫn giữ nguyên độ dài là 0
        expect(service.todos.length).toBe(0);
    });
});
