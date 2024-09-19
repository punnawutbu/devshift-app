import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { NewsData } from '@/types/NewsData';

interface EditNewsModalProps {
    isOpen: boolean;
    toggle: () => void;
    newsData: Partial<NewsData>;
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditNewsModal: React.FC<EditNewsModalProps> = ({ isOpen, toggle, newsData, onSubmit, onChange, onFileChange }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>แก้ไขข้อมูลข่าว</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="title">หัวข้อข่าว</Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            value={newsData.title || ''}
                            onChange={onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">เนื้อหาข่าว</Label>
                        <Input
                            type="textarea"
                            name="content"
                            id="content"
                            value={newsData.content || ''}
                            onChange={onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">รูปภาพข่าว</Label>
                        <Input
                            type="file"
                            name="image"
                            id="image"
                            onChange={onFileChange}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onSubmit}>
                    บันทึกการแก้ไข
                </Button>
                <Button color="secondary" onClick={toggle}>
                    ยกเลิก
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditNewsModal;
