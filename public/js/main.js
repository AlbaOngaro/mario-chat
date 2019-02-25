var socket = io.connect('http://localhost:4000');

var Message = {
    props: ['handle','message'],
    template: `<p><strong>{{ handle }}:</strong> {{ message }}</p>`
};

var app = new Vue({
    el: '#app',
    components: {
        'chat-message': Message
    },
    data: {
      message: '',
      handle: ''
    },
    methods: {
        emitEvent: function(){
            var vm = this;

            socket.emit('chat', {
                handle: vm.handle,
                message: vm.message
            });
        },
        insertMessage: function () {
            var vm = this;

            var ComponentClass = Vue.extend(Message);
            var instance = new ComponentClass({
                propsData: { handle: vm.handle, message: vm.message }
            })
            
            instance.$mount()
            this.$el.querySelector('#chat-window').appendChild(instance.$el);
        }
    }
});

socket.on('chat', function(data){
    app.message = data.message;
    app.handle = data.handle;
    app.insertMessage();
})