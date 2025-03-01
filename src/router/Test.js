import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';


const Test = () => {

    const navigate = useNavigate();

    // 로그인 버튼 기능
    const onSubmit = async (event) => {
        event.preventDefault(); // 폼 기본 제출 방지

        const formData = new FormData(event.target);
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        if (localStorage.getItem('token') != null) {
            console.log('Token removed:', localStorage.getItem('token'));
            localStorage.removeItem('token');
        }

        try {
            const response = await axios.post('/api/login', data, {
                headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 전송
                },
            });

            const token = response.headers['access']; // 토큰 추출
            if (token) {
                localStorage.setItem('access', token); // 토큰 저장
                console.log('Token stored:', token);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Spring 과의 연결 테스트
    const Connecting = async () => {
        try {
            const response = await axios.get('/api/test/');
            console.log(response.data);
        } catch (error) {
            console.error('Failed:', error);
        }
    }

    // Post Test 버튼 기능
    const onClickPostTest = async () => {
        const data = {
            username: 'test',
        };

        try {
            const response = await axios.post('/api/test/', data, {
                headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 전송
                },
            });
        } catch (error) {
            console.error('Test failed:', error);
        }
    };

    // aceess token 확인
    const onClickCheckLocalStroge = async () => {
        try {
            const token = localStorage.getItem('access');
            console.log('Token:', token);
        } catch (error) {
            console.error('CheckToken failed:', error);
        }
    }

    // aceess token 으로 rest api 호출
    const onClickCheckSpringToken = async () => {
        try {
            const token = localStorage.getItem('access');

            const response = await axios.get('/api/access', {
                headers: {
                    access: token,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('CheckToken failed:', error);
        }
    }

    // refresh token을 사용하여 access token 재발급
    const onClickRefresh = async () => {
        try {
            const response = await axios.post('/api/reissue', {
                headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 전송
                },
            });

            const token = response.headers['access']; // 토큰 추출
            if (token) {
                localStorage.setItem('access', token); // 토큰 저장
                console.log('Token stored:', token);
            }
        } catch (error) {
            console.error('Refresh failed:', error);
        }
    }

    const onClickMove = async () => {
        navigate("/main");
    }

    // axios 인스턴스를 사용하여 rest api 호출
    const apiAccess = async () => {
        try {
            const response = await axiosInstance.get('/access');
            console.log(response.data);
        } catch (error) {
            console.error('Failed:', error);
    }};

    return (
        <div className="flex flex-col item-center px-32 py-64 bg-neutral-100">

            <div className="flex m-5 justify-center gap-4 items-center">
                <button className="naver-login-button" onClick={Connecting}>Connecting</button>
                <button className="naver-login-button" onClick={onClickPostTest}>PostTestMessage</button>
                <button className="naver-login-button" onClick={onClickCheckLocalStroge}>CheckLocalStroge</button>
                <button className="naver-login-button" onClick={onClickCheckSpringToken}>CheckToken</button>
                <button className="naver-login-button" onClick={onClickRefresh}>Refresh</button>
            </div>
            <div className="flex m-5 justify-center gap-4 items-center">
                <button className="naver-login-button-blue" onClick={apiAccess}>Test</button>
                <button className="naver-login-button-blue" onClick={onClickMove}>Move</button>
            </div>
            <div className="my-64 w-80 text-center m-auto">
                <form onSubmit={onSubmit} className="">
                    <input
                        type="text"
                        name="username"
                        className="w-full input-box"
                        placeholder="아이디 또는 전화번호"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="w-full input-box"
                        placeholder="비밀번호"
                        required
                    />
                    <button type="submit" className="naver-login-button">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Test;