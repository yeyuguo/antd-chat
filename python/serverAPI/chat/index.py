#coding:utf-8
# from . import chat
from flask import jsonify,abort
from . import chat
import time

@chat.route('/test',methods=['GET'])
def test():
    # return jsonify({'msg':'test error','status':200})
    return 'chat success'


@chat.route('/',methods=['GET'])
def main():
    data = {}
    initTimt = time.mktime(time.strptime('2017-03-20 23:32:00','%Y-%m-%d %H:%M:%S'))
    data_demo = {
            'defaultAvator': '../../images/yeoman.png',
            # 倒着渲染
            'users': [{
                    'avator': '../../images/mn1.jpg',
                    'userName': '小玲',
                    'userID': '001',
                    'msgInfo': [{
                        # 'latestModify': new Date('2017-03-17 14:6:25'),
                        'latestModify': initTimt,
                        'latestMsg': '你好，很高兴认识你！'
                    }],
                    'isRead': False
                },
                {
                    'avator': '../../images/mn2.jpg',
                    'userName': '马玲',
                    'userID': '002',
                    'msgInfo': [{
                        # 'latestModify': new Date('2017-03-16 16:30:25'),
                        'latestModify': initTimt,
                        'latestMsg': '你好，很高兴认识你！你好，很高兴认识你！你好，很高兴认识你！'
                    }, {
                        # 'latestModify': new Date('2017-03-16 12:30:25'),
                        'latestModify': initTimt,
                        'latestMsg': '你好，很高兴认识你！你好，很高兴认识你！你好，很高兴认识你！'
                    }],
                    'isRead': False
                },
                {
                    'avator': '',
                    'userName': '玲玲',
                    'userID': '003',
                    'msgInfo': [{
                        # 'latestModify': new Date('2017-03-15 11:30:25'),
                        'latestModify': initTimt,
                        'latestMsg': '你好，很高兴认识你！'
                    }],
                    'isRead': True
                }
            ]
        }
    data = {
        'status':200,
        'data':data_demo
    }
    return jsonify(data)
    pass


