new Vue({
    el: '#app',
    data: {
        todos: [
            { id: 1, content: '面试', f: true },
            { id: 2, content: '撸猫', f: true },
            { id: 3, content: '聊天', f: true }
        ],
        addItem: '',
        maskFlag: false,
        submit: false,
        activeIndex: -1,
        type: 'A',
        tabBars: [
            { id: 1, text: 'A', style: 'success' },
            { id: 2, text: 'F', style: 'primary' },
            { id: 3, text: 'U', style: 'danger' }
        ]
    },
    methods: {
        add() {
            if (this.addItem != '') {

                this.todos.push({
                    id: this.todos.length + 1,
                    content: this.addItem,
                    f: true
                });
            }
            this.submit = false;
            this.addItem = '';
            $.toast('操作成功', 500);
        },
        check(index) {
            //如果已经完成
            if (this.todos[index].f) {
                this.remove(index)
            } else {
                //未完成
                this.maskFlag = true
                    //保存当前删除的索引
                this.activeIndex = index
            }
        },
        remove(index) {
            $.toast('操作成功', 500)
            this.todos.splice(index, 1)
            this.sort()

        },
        sort() {
            for (let i = 0; i < this.todos.length; i++) {
                this.todos[i].id = i + 1;
            }
        },
        //确认删除
        confirm(index) {
            this.remove(index)
        }
    },
    computed: {
        finished() {
            return this.todos.filter(function(item) {
                return item.f ? item : false
            })
        },
        unfinished() {
            return this.todos.filter(function(item) {
                return !item.f ? item : false
            })
        },
        newTodos() {
            switch (this.type) {
                case "A":
                    return this.todos
                    break;
                case "F":
                    return this.finished
                    break;
                case "U":
                    return this.unfinished
                    break;
            }
        }
    },
})