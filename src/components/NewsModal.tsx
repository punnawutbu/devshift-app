// src/components/NewsModal.tsx
"use client";

import React, { ChangeEvent, FormEvent } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from 'reactstrap';
import { NewsData } from '@/types/NewsData';

interface NewsModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  newNews: Partial<NewsData>;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, toggle, onSubmit, onChange, onFileChange, newNews }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>เพิ่มข่าว</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="title">หัวข้อข่าว</Label>
          <Input type="text" name="title" id="title" value={newNews.title || ''} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="content">รายละเอียดข่าว</Label>
          <Input type="text" name="content" id="content" value={newNews.content || ''} onChange={onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="image">อัปโหลดรูปภาพ</Label>
          <Input type="file" name="image" id="image" onChange={onFileChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSubmit}>บันทึก</Button>{' '}
        <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewsModal;
