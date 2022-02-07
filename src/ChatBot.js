// App.js
import React from 'react';
import {View} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import request from './utils/fetchService';
import Tts from 'react-native-tts';
import Graph from "./graph"

export default class ChatBot extends React.Component {
  state = {
      token: "",
    messages: [
      {
        _id: 2,
        text: 'Hi, I am Barn365 Assistant. How may I help you?',
        createdAt: new Date(),
        ren: 'hello',
        user: {
          _id: 2,
        },
      },
    ],
  };

  componentDidMount(){
    this.state.messages.map(data => {
      Tts.speak(data.text, {
        androidParams: {
          KEY_PARAM_VOLUME: 10,
        },
      });
    })

  }

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
      console.log('payload', payload);
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
            Tts.speak(item.text, {
              androidParams: {
                KEY_PARAM_VOLUME: 10,
              },
            });
            const object = {
              _id: Math.round(Math.random() * 1000000),
              createdAt: new Date(),
              text: item?.text,
              user: {_id: Math.round(Math.random() * 1000000)},
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
        // renderBubble={() => <Graph/>}
        renderAvatar={() => null}
        textInputStyle ={{color: 'black'}}
        scrollToBottom
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          onQuickReply={(reply) => {
            reply.length &&
              reply.map((data) =>
                this.onSend([
                  {
                    _id: '3652eb59-124d-42fc-88d4-ee770b73d2c6',
                    createdAt: new Date(),
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

