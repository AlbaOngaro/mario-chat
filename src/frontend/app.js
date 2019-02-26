import "./scss/styles.scss";

import Message from './components/Message.vue';
import Feedback from './components/Feedback.vue';

let socket = io.connect('http://localhost:4000');

let app = new Vue({
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
        emitChatEvent(){
            var vm = this;

            socket.emit('chat', {
                handle: vm.handle,
                message: vm.message
            });

            vm.message = '';
        },
        emitWiritingEvent(){
            var vm = this;

            socket.emit('typing', {
                handle: vm.handle
            });
        },
        insertMessage(handle, message) {
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

socket.on('chat', (data) => {
    app.toggleFeedback(false);
    app.insertMessage(data.handle, data.message);
});

socket.on('typing', (data) => {
    app.$refs.feedback.handle = data.handle;
    app.toggleFeedback(true);
});