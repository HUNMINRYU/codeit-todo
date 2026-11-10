/** 이미지 첨부 제한(과제 요구사항) */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * 파일 이름이 영어(영문·숫자·기본 기호)로만 이루어졌는지, 5MB 이하인지 검사한다.
 * 통과하면 null, 아니면 사용자에게 보여줄 메시지를 돌려준다.
 */
export function validateImage(file: File): string | null {
  if (!/^[A-Za-z0-9._\-() ]+$/.test(file.name)) {
    return "이미지 파일 이름은 영어로만 이루어져야 합니다.";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "이미지 파일 크기는 5MB 이하여야 합니다.";
  }
  return null;
}
