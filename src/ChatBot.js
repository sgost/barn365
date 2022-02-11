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
    this.state.random_id = random_string;
  }

  sendMessages = async ( senderData ) =>
  {
    try
    {
      const payload = {
        message: senderData?.text,
        sender: senderData?._id,
      };
      const authorization = 'Bearer ' + ( this.props.ACCESS_TOKEN );
      const TenantId = this.props.USERID;
      request(
        `https://dev.barn365.com/api/webhooks/rest/webhook`,
        'POST',
        payload,
        authorization,
        TenantId,
      ).then( ( response ) =>
      {
        // const kkkk = response.map(res => res.text);
        // this.state.pass_ob = res.text;
        // console.log( 'kkkk', kkkk );
        const responseMessages =
          response.length &&
          response.map( ( mapData ) =>
          {

            let mapItem = mapData;

            const conText = JSON.stringify( mapItem );
            const conText2 = conText.replace( /[\\]/g, '' );

            const res = conText2.replace(
              /("{)/g,
              '{'
            )

            const res2 = res.replace(
              /(}")/g,
              '}'
            )
            const res3 = res2.replace( '"[', "[" );

            const last = res3.replace(
              /(]")/g,
              ']'
            )

            const item = JSON.parse( last );

            console.log( "item", item )


            console.log( 'item.text.msg', item.text.msg )


            Tts.speak( mapData.text, {
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

            if ( !item?.buttons )
            {
              return object;
            }
            return {
              ...object,
              ...{
                graph: true,
                quickReplies: {
                  type: 'radio',
                  values: item.buttons,
                },
              },
            };
          } );

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

  renderBubble = ( props ) =>
  {
    const { currentMessage } = props;

    console.log('currentMessage', currentMessage)
    if ( currentMessage.graph )
    {
      return <Graph />
    }
    return <Bubble { ...props } />
  }

  render ()
  {
    return (
      <View style={ { flex: 1, backgroundColor: '#fff' } }>
        <GiftedChat
          renderBubble={ this.renderBubble }
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

