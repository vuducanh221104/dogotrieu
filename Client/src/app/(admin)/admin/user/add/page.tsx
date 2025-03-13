'use client';
import React, { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { useRouter } from 'next-nprogress-bar';
import { adminAddUser } from '@/services/authServices';
import ModalLoadingAdmin from '@/components/ModalLoadingAdmin';
import { AdminUserFormValues, ApiError } from '@/types/client';

function UserAddPage() {
    const [form] = Form.useForm<AdminUserFormValues>();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: AdminUserFormValues) => {
        setLoading(true);
        try {
            const userData = {
                email: values.email,
                password: values.password,
                username: values.username,
                full_name: values.full_name,
                phone_number: values.phone_number,
                role: values.role,
                status: values.status,
            };

            await adminAddUser(userData);
            message.success('User added successfully!');
            form.resetFields();
            form.setFieldsValue({
                role: 0,
                status: 1,
            });
        } catch (error: ApiError | any) {
            if (error.response?.data?.message) {
                message.error(error.response.data.message);
            } else {
                message.error('Failed to add user');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <ModalLoadingAdmin />}
            <div className="p-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-semibold mb-6">Add New User</h1>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{
                            role: 0,
                            status: 1,
                        }}
                    >
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                { required: true, message: 'Please input username!' },
                                { min: 3, message: 'Username must be at least 3 characters!' },
                            ]}
                        >
                            <Input placeholder="Enter username" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please input email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                { required: true, message: 'Please input password!' },
                                { min: 6, message: 'Password must be at least 6 characters!' },
                            ]}
                        >
                            <Input.Password placeholder="Enter password" />
                        </Form.Item>

                        <Form.Item
                            name="full_name"
                            label="Full Name"
                            rules={[
                                { required: true, message: 'Please input full name!' },
                                {
                                    pattern:
                                        /^[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
                                    message: 'Full name can only contain letters, numbers, underscores and spaces!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter full name" />
                        </Form.Item>

                        <Form.Item
                            name="phone_number"
                            label="Phone Number"
                            rules={[
                                { required: true, message: 'Please input phone number!' },
                                {
                                    pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-5]|9[0-4|6-9])[0-9]{7}$/,
                                    message: 'Invalid phone number format!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter phone number" />
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[{ required: true, message: 'Please select role!' }]}
                        >
                            <Select>
                                <Select.Option value={0}>User</Select.Option>
                                <Select.Option value={1}>Manager</Select.Option>
                                <Select.Option value={2}>Admin</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: 'Please select status!' }]}
                        >
                            <Select>
                                <Select.Option value={1}>Active</Select.Option>
                                <Select.Option value={0}>Inactive</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <div className="flex justify-end space-x-4">
                                <Button onClick={() => router.push('/admin/user/list')}>Cancel</Button>
                                <Button type="primary" htmlType="submit">
                                    Add User
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default UserAddPage;
