// App.js
import React from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import request from './utils/fetchService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChatBot extends React.Component {
  state = {
      token: "",
    messages: [
      {
        _id: 2,
        text: 'Hi, I am Barn365 Assistant. How may I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          avatar: 'https://media.istockphoto.com/vectors/blue-cute-robot-vector-id1191411980?k=20&m=1191411980&s=612x612&w=0&h=RwynZNA7Gf-VO3W8cuhI1s9bsKbZ1QZ89rKNrfSJCMA=',
        },
      },
    ],
  };

  onSend(messages = []) {
    messages.length &&
      messages.map((data) => {
        this.sendMessages(data);
      });
  }

  sendMessages = async (senderData) => {

    console.log('senderData', senderData)
    try {
      const payload = {
        message: senderData?.text,
        sender: senderData?._id,
      };

      const authorization = 'Bearer '+(this.props.ACCESS_TOKEN);
      const TenantId = this.props.USERID; 
      console.log('authorization', authorization)
      console.log('TenantId', TenantId)
      request(
        `https://dev.barn365.com/api/webhooks/rest/webhook`,
        'POST',
        payload,
        authorization,
        TenantId,
      ).then((response) => {
        console.log('response', response);
        const responseMessages =
          response.length &&
          response.map((item) => {
            const object = {
              _id: Math.round(Math.random() * 1000000),
              createdAt: new Date(),
              text: item?.text,
              user: {_id: Math.round(Math.random() * 1000000), avatar: 'https://media.istockphoto.com/vectors/blue-cute-robot-vector-id1191411980?k=20&m=1191411980&s=612x612&w=0&h=RwynZNA7Gf-VO3W8cuhI1s9bsKbZ1QZ89rKNrfSJCMA=',},
            };
            console.log('object', object)
            if (!item?.buttons) {
              return object;
            }
            return {
              ...object,
              ...{
                quickReplies: {
                  type: 'radio',
                  values: item.buttons,
                },
              },
            };
          });
        console.log('responseMessages', responseMessages);
        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, [
            ...responseMessages,
            ...[senderData],
          ]),
        }));
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <GiftedChat
        textInputStyle ={{color: 'black'}}
        scrollToBottom
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          onQuickReply={(reply) => {
            reply.length &&
              reply.map((data) =>
                this.onSend([
                  {
                    _id: 'c3c028b6-b58f-4947-b116-b7ae20361a2e',
                    createdAt: '2022-01-27T02:50:44.363Z',
                    text: data?.title,
                    user: {_id: 1},
                  },
                ]),
              );
          }}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

