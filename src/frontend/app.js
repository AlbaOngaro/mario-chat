import "./scss/styles.scss";

// import Vue from 'vue';

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
        messages: [{
            handle: 'Alba',
            message: 'sample message',
            classname: 'right'
        },
        {
            handle: 'Alba',
            message: 'sample message',
            classname: 'left'
        }],
        user: {
            handle: '',
            message: '',
        },
        feedback: {
            handle: '',
            visible: false
        }
    },
    methods: {
        emitChatEvent(){
            var vm = this;

            socket.emit('chat', {
                handle: vm.user.handle,
                message: vm.user.message
            });

            vm.user.message = '';
        },
        emitWiritingEvent(){
            var vm = this;

            socket.emit('typing', {
                handle: vm.user.handle
            });
        },
        insertMessage(message) {
            this.messages.push(message);
        },
        setFeedbackName(name){
            this.feedback.handle = name;
        },
        toggleFeedback(visible){
            console.log(this.feedback.visible);
            this.feedback.visible = visible;
        }
    }
});

socket.on('chat', (data) => {
    app.toggleFeedback(false);

    if(data.handle === app.user.handle){
        data.classname = 'right';
    } else {
        data.classname = 'left';
    }

    app.insertMessage(data);
});

/* socket.on('typing', (data) => {
    app.setFeedbackName(data.handle);
    app.toggleFeedback(true);
}); */