"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import Memo from "@/components/Memo";
import NameBar from "@/components/NameBar";
import { deleteTodo, getTodo, updateTodo, uploadImage } from "@/lib/api";
import type { TodoDetail } from "@/types/todo";

/** 할 일 상세 화면: 이름·상태·메모·이미지 수정, 삭제 */
export default function TodoDetail() {
  const { itemId } = useParams<{ itemId: string }>();
  const router = useRouter();

  const [original, setOriginal] = useState<TodoDetail | null>(null);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  /** 새로 고른 이미지 파일(수정 완료 시에 업로드) */
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getTodo(Number(itemId))
      .then((todo) => {
        setOriginal(todo);
        setName(todo.name);
        setMemo(todo.memo ?? "");
        setIsCompleted(todo.isCompleted);
        setPreview(todo.imageUrl);
      })
      .catch((e: Error) => {
        alert(e.message);
        router.push("/");
      });
  }, [itemId, router]);

  // 로컬 미리보기 URL은 페이지를 떠날 때 해제한다
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /** 새 이미지를 고르면 업로드는 미루고 로컬 미리보기만 바꾼다 */
  const handleSelectImage = (file: File) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  if (!original) {
    return <p className="mt-10 text-center text-slate-400">불러오는 중...</p>;
  }

  const isDirty =
    name !== original.name ||
    memo !== (original.memo ?? "") ||
    isCompleted !== original.isCompleted ||
    imageFile !== null;

  /** 이미지가 새로 선택됐으면 먼저 업로드하고, 받은 URL과 함께 변경 사항을 저장한 뒤 목록으로 이동 */
  const handleSave = async () => {
    if (!name.trim()) {
      alert("할 일 이름을 입력해주세요.");
      return;
    }
    setSaving(true);
    try {
      const imageUrl = imageFile ? (await uploadImage(imageFile)).url : original.imageUrl;
      await updateTodo(original.id, {
        name: name.trim(),
        memo,
        isCompleted,
        ...(imageUrl ? { imageUrl } : {}),
      });
      router.push("/");
    } catch (e) {
      alert((e as Error).message);
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("이 할 일을 삭제할까요?")) return;
    try {
      await deleteTodo(original.id);
      router.push("/");
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <main className="mx-auto min-h-[calc(100vh-60px)] max-w-[1200px] bg-white px-4 py-4 tablet:px-6 tablet:py-6 desktop:px-[102px]">
      <NameBar
        name={name}
        isCompleted={isCompleted}
        onNameChange={setName}
        onToggle={() => setIsCompleted((v) => !v)}
      />

      <div className="mt-4 flex flex-col gap-4 tablet:mt-6 tablet:gap-6 desktop:flex-row">
        <ImageUpload src={preview} onSelect={handleSelectImage} />
        <Memo value={memo} onChange={setMemo} />
      </div>

      <div className="mt-6 flex justify-center gap-2 tablet:gap-4 desktop:justify-end">
        <Button
          variant="edit"
          active={isDirty}
          disabled={saving}
          onClick={handleSave}
          // eslint-disable-next-line @next/next/no-img-element
          icon={<img src="/images/ic-check.svg" alt="" className="h-4 w-4" />}
        >
          수정 완료
        </Button>
        <Button
          variant="delete"
          disabled={saving}
          onClick={handleDelete}
          // eslint-disable-next-line @next/next/no-img-element
          icon={<img src="/images/ic-x.svg" alt="" className="h-4 w-4" />}
        >
          삭제하기
        </Button>
      </div>
    </main>
  );
}
