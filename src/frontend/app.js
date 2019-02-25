import "../scss/styles.scss";

var socket = io.connect('http://localhost:4000');

var Message = {
    props: ['handle','message'],
    template: `<p><strong>{{ handle }}:</strong> {{ message }}</p>`
};

var Feedback = {
    props: {
        handle: {
            type: String    
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    template: `<p v-show="visible" class="feedback"><em>{{ handle }} is writing</em></p>`
};

var app = new Vue({
    el: '#app',
    components: {
        'chat-message': Message,
        'chat-feedback': Feedback
    },
    data: {
      message: '',
      handle: ''
    },
    methods: {
        emitChatEvent: function(){
            var vm = this;

            socket.emit('chat', {
                handle: vm.handle,
                message: vm.message
            });
        },
        emitWiritingEvent: function(){
            var vm = this;

            socket.emit('typing', {
                handle: vm.handle
            });
        },
        insertMessage: function (handle, message) {
            var ComponentClass = Vue.extend(Message);
            var instance = new ComponentClass({
                propsData: { handle: handle, message: message }
            })
            
            instance.$mount()
            this.$el.querySelector('#chat-window').appendChild(instance.$el);
        },
        toggleFeedback(visible){
            this.$refs.feedback.visible = visible;
        }
    }
});

socket.on('chat', function(data){
    app.toggleFeedback(false);
    app.insertMessage(data.handle, data.message);
});

socket.on('typing', function(data) {
    app.$refs.feedback.handle = data.handle;
    app.toggleFeedback(true);
});