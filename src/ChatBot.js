// App.js
import React from 'react';
import { View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import request from './utils/fetchService';
import Tts from 'react-native-tts';
import Graph from "./graph"

export default class ChatBot extends React.Component
{
  state = {
    token: "",
    random_id: "",
    pass_ob: "",
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

  componentDidMount ()
  {
    this.create_random_string();
    this.state.messages.map( data =>
    {
      Tts.speak( data.text, {
        androidParams: {
          KEY_PARAM_VOLUME: 10,
        },
      } );
    } )

  }

  onSend ( messages = [] )
  {
    messages.length &&
      messages.map( ( data ) =>
      {
        this.sendMessages( data );
      } );
  }

  create_random_string ()
  {
    var random_string = '';
    var characters = 'e6e36a42-20b5-4e9d-9600-4c3431c49fcd'
    for ( var i, i = 0; i < characters.length; i++ )
    {
      random_string += characters.charAt( Math.random() * characters.length )
    }
    console.log( 'random_string', random_string )
    this.state.random_id = random_string;
  }

  sendMessages = async ( senderData ) =>
  {
    console.log( 'senderData', senderData )
    try
    {
      const payload = {
        message: senderData?.text,
        sender: senderData?._id,
      };
      console.log( 'payload', payload );
      const authorization = 'Bearer ' + ( this.props.ACCESS_TOKEN );
      const TenantId = this.props.USERID;
      console.log( 'authorization', authorization )
      console.log( 'TenantId', TenantId )
      request(
        `https://dev.barn365.com/api/webhooks/rest/webhook`,
        'POST',
        payload,
        authorization,
        TenantId,
      ).then( ( response ) =>
      {
        console.log( 'response', response );
        // const kkkk = response.map(res => res.text);
        // this.state.pass_ob = res.text;
        // console.log( 'kkkk', kkkk );
        const responseMessages =
          response.length &&
          response.map( ( item ) =>
          {
            Tts.speak( item.text, {
              androidParams: {
                KEY_PARAM_VOLUME: 10,
              },
            } );
            const object = {
              _id: Math.round( Math.random() * 1000000 ),
              createdAt: new Date(),
              text: item?.text,
              user: { _id: Math.round( Math.random() * 1000000 ) },
            };
            console.log( 'object', object )
            console.log( 'object.text', object.text )
            this.state.pass_ob = object.text;

            if ( !item?.buttons )
            {
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
          } );
        console.log( 'responseMessages', responseMessages );
        
        const con_text = JSON.stringify(responseMessages.map(res => res.text));
        const con_text2 =  con_text.replace(/[\\]/g, '');
        this.state.pass_ob = con_text2.msg;
        console.log( 'con_text2', con_text2 );

        this.setState( ( previousState ) => ( {
          messages: GiftedChat.append( previousState.messages, [
            ...responseMessages,
            ...[ senderData ],
          ] ),
        } ) );
      } );
    } catch ( error )
    {
      throw new Error( error );
    }
  };


  // renderBubble = props => {
  //   if (this.state.pass_ob) {
  //     return (<Graph/>)
  //   }
  //   return (<Bubble {...props} textStyle={{left: {color: `white`}}} wrapperStyle={{left: {backgroundColor: `#1e2a5c`, color: `white`}}}/>)
  // }
 
  render ()
  {
    return (
      <View style={ { flex: 1, backgroundColor: '#fff' } }>
        <GiftedChat
          // renderBubble={() => <Graph/>}
          renderAvatar={ () => null }
          textInputStyle={ { color: 'black' } }
          scrollToBottom
          messages={ this.state.messages }
          onSend={ ( messages ) => this.onSend( messages ) }
          onQuickReply={ ( reply ) =>
          {
            reply.length &&
              reply.map( ( data ) =>
                this.onSend( [
                  {
                    _id: this.state.random_id,
                    createdAt: new Date(),
                    text: data?.title.toLowerCase(),
                    user: { _id: 1 },
                  },
                ] ),
              );
          } }
          user={ {
            _id: 1,
          } }
        />
      </View>
    );
  }
}

