import { TextField, Box, FormControl, IconButton } from "@mui/material";

/**
 * 한 줄 입력을 위한 MUI 기반 텍스트 필드 컴포넌트
 * @param {Object} props - 컴포넌트 매개변수
 * @param {string} [props.label] - 입력 필드 라벨 텍스트
 * @param {string} [props.value] - 현재 값
 * @param {boolean} [props.readOnly=false] - 읽기 전용 여부
 * @param {boolean} [props.readOnlyStyle=true] - 읽기 전용일 때 회색 스타일 적용 여부
 * @param {TextFieldProps} [props.textProps] - 그 외 MUI TextField 속성들
 * 
 * @description
 * - MUI의 FormControl, Box, TextField를 사용하여 한 줄 입력을 위한 필드를 생성
 * - 기본적으로 fullWidth, autoComplete="off" 옵션이 적용됨
 * - textProps를 통해 추가적인 MUI TextField 속성을 적용 가능
 * 
 * @author sj_hong
 * @updated 2025-05-08
 * @example
 * <CatTextField 
 *   label="라벨 명칭" 
 *   value={'값'} 
 *   onChange={(e) => console.log(e.target.value)} 
 *   style={{ height: '40px' }}
 * />
 */
export default function CatTextField({
    label = '',
    value = '',
    readOnly = false,
    readOnlyStyle = false, 
    ...textProps
}) {
    return (
        <FormControl fullWidth>
            <Box display="flex">
                <TextField
                    fullWidth
                    label={label}
                    value={value}
                    autoComplete="off"
                    InputProps={{
                        readOnly: readOnly,
                    }}
                    sx={{
                        ...(readOnly && readOnlyStyle && {
                            backgroundColor: '#f0f0f0',
                            '& .MuiInputBase-input': {
                                color: '#555',
                            },
                        }),
                    }}
                    {...textProps}
                />
            </Box>
        </FormControl>
    );
}


/**************************************************************************************************************************
          .         .                                                                                                      
         ,8.       ,8.                   .8.          b.             8 8 8888      88          .8.          8 8888         
        ,888.     ,888.                 .888.         888o.          8 8 8888      88         .888.         8 8888         
       .`8888.   .`8888.               :88888.        Y88888o.       8 8 8888      88        :88888.        8 8888         
      ,8.`8888. ,8.`8888.             . `88888.       .`Y888888o.    8 8 8888      88       . `88888.       8 8888         
     ,8'8.`8888,8^8.`8888.           .8. `88888.      8o. `Y888888o. 8 8 8888      88      .8. `88888.      8 8888         
    ,8' `8.`8888' `8.`8888.         .8`8. `88888.     8`Y8o. `Y88888o8 8 8888      88     .8`8. `88888.     8 8888         
   ,8'   `8.`88'   `8.`8888.       .8' `8. `88888.    8   `Y8o. `Y8888 8 8888      88    .8' `8. `88888.    8 8888         
  ,8'     `8.`'     `8.`8888.     .8'   `8. `88888.   8      `Y8o. `Y8 ` 8888     ,8P   .8'   `8. `88888.   8 8888         
 ,8'       `8        `8.`8888.   .888888888. `88888.  8         `Y8o.`   8888   ,d8P   .888888888. `88888.  8 8888         
,8'         `         `8.`8888. .8'       `8. `88888. 8            `Yo    `Y88888P'   .8'       `8. `88888. 8 888888888888 
**************************************************************************************************************************

기본 사용 예시
**************

	return (
		<CatTextFieldReadonly
			label={"라벨 명칭"} 
			value={값} 
			style={height: '35px'}
		/>
	)


**************************************************************************************************************************/